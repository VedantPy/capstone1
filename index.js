document.getElementById('registrationForm').addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Validate the form fields
    if (!this.checkValidity()) {
        alert('Please fill in all required fields with valid data.');
        return;
    }

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('dob').value;
    var terms = document.getElementById('terms').checked;

    // Calculate age based on the date of birth
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();

    // Check if the calculated age is within the required range (18-55)
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55 years.');
        return;
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
    this.reset();
});

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
