const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nazeer3664',
    database: 'projectdb'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Session middleware
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    (username, password, done) => {
        connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (err, results) => {
                if (err) { return done(err); }
                if (!results.length || results[0].password !== password) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }
                return done(null, results[0]);
            }
        );
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id],
        (err, results) => {
            if (err) { return done(err); }
            done(null, results[0]);
        }
    );
});

// Routes and middleware
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/profile', isAuthenticated, (req, res) => {
    res.send('Profile Page');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/login', (req, res) => {
    res.send('Login Page');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
