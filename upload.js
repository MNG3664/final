const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'repository'); // Save files to the 'repository' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});


const upload = multer({ storage: storage });

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin home page.html'));
});

// Handle file upload
app.post('/upload', upload.single('projectFile'), (req, res) => {
  res.send('File uploaded successfully.');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
