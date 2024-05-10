document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('registerUserForm').addEventListener('submit', function(event) {
        event.preventDefault();

    // Validate user type
    const userType = document.getElementById('userType').value;
    if (userType === '') {
        alert('Please select a user type.');
        return;
    }

    // Send the user registration data to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userType: userType,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered:', data);
        // Handle server response
    })
    .catch(error => {
        console.error('Error registering user:', error);
        // Handle errors
    });

    document.getElementById('registerUserForm').reset();
});
