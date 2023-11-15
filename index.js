// Function to calculate age based on the date of birth
function calculateAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    return age;
}

// Function to validate the form submission
function validateForm() {
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('dob').value;
    var terms = document.getElementById('terms').checked;

    // Validate email format
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Calculate age and check if it's between 18 and 55
    var age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55 years.');
        return false;
    }

    // Store data in localStorage
    var userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        terms: terms
    };

    // Retrieve existing data from localStorage
    var storedData = JSON.parse(localStorage.getItem('userData')) || [];

    // Add new data to the array
    storedData.push(userData);

    // Update localStorage with the new data
    localStorage.setItem('userData', JSON.stringify(storedData));

    // Update the table
    updateTable();

    // Reset the form
    document.getElementById('registrationForm').reset();

    return true;
}

// Function to update the table with stored data
function updateTable() {
    // Get table body
    var tableBody = document.querySelector('#userDataTable tbody');

    // Clear existing rows
    tableBody.innerHTML = '';

    // Retrieve data from localStorage
    var storedData = JSON.parse(localStorage.getItem('userData')) || [];

    // Populate the table with the retrieved data
    storedData.forEach(function (userData) {
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = userData.name;
        row.insertCell(1).textContent = userData.email;
        row.insertCell(2).textContent = userData.password;
        row.insertCell(3).textContent = userData.dob;
        row.insertCell(4).textContent = userData.terms ? 'Yes' : 'No';
    });
}

// Call updateTable on page load to populate the table with existing data
updateTable();
