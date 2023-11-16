// Function to calculate age based on the date of birth
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

// Function to validate email format
function validateEmail(element) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (element.validity.typeMismatch) {
        element.setCustomValidity("Enter a valid email address");
        element.reportValidity();
    } else {
        element.setCustomValidity("");
    }
}

// Event listener for date of birth input
const dobInput = document.getElementById("dob");
dobInput.addEventListener("input", () => {
    const [year, month, date] = dobInput.value.split("-");
    const dob = new Date(year, month - 1, date); // Month is 0-indexed in JavaScript

    const age = calculateAge(dob);

    if (age < 18 || age > 55) {
        dobInput.setCustomValidity("Your age must be between 18 and 55");
    } else {
        dobInput.setCustomValidity("");
    }
});

// Event listener for email input
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", () => {
    validateEmail(emailInput);
});

// Event listener for form submission
const regForm = document.getElementById('regForm');
regForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = emailInput.value;
    const password = document.getElementById('password').value;
    const dob = dobInput.value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Validate email format
    validateEmail(emailInput);

    // Validate date of birth
    const dobDate = new Date(dob);
    const age = calculateAge(dobDate);
    if (age < 18 || age > 55) {
        dobInput.setCustomValidity("Your age must be between 18 and 55");
    } else {
        dobInput.setCustomValidity("");
    }

    // If the form is valid, proceed to store data
    if (regForm.checkValidity()) {
        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTerms
        };

        // Retrieve existing data from localStorage
        const storedData = JSON.parse(localStorage.getItem('user-entries')) || [];

        // Add new data to the array
        storedData.push(entry);

        // Update localStorage with the new data
        localStorage.setItem('user-entries', JSON.stringify(storedData));

        // Update the table
        displayEntries();

        // Reset the form
        regForm.reset();
    }
});

// Function to display entries in the table
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('user-entries')) || [];
    const tableContainer = document.getElementById('table');
    const tableHeader = "<tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th></tr>";
    const tableRows = entries.map(entry => {
        const { name, email, password, dob, acceptedTerms } = entry;
        return `<tr><td>${name}</td><td>${email}</td><td>${password}</td><td>${dob}</td><td>${acceptedTerms ? 'Yes' : 'No'}</td></tr>`;
    }).join("\n");

    const table = tableHeader + tableRows;
    tableContainer.innerHTML = table;
}

// Display entries on page load
displayEntries();
