const express = require('express');
const app = express();

// Define endpoint to serve projects
app.get('/repsoitory', (req, res) => {
    // Assuming projects are stored in an array of objects
    const projects = [
        { title: 'Project 1 Title', url: 'project1.pdf' },
        { title: 'Project 2 Title', url: 'project2.pdf' },
        // Add more projects as needed
    ];
    res.json(projects);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
