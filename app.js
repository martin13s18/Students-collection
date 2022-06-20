async function attachEvents() {

    // Taking DOM elements and setting URL address
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const tbody = document.querySelector('#results > tbody');
    const submitBtn = document.getElementById('submit');
    const firstName = document.querySelector('[name="firstName"]');
    const lastName = document.querySelector('[name="lastName"]');
    const facultyNumber = document.querySelector('[name="facultyNumber"]');
    const grade = document.querySelector('[name="grade"]');

    // On load default GET request to show all information
    const response = await fetch(url);
    const data = await response.json();

    // Appending the response data on DOM tree table
    Object.values(data).forEach(el => {

        let trElement = document.createElement('tr');

        let firstNameTd = document.createElement('td');
        firstNameTd.textContent = el.firstName;
        trElement.appendChild(firstNameTd);

        let lastNameTd = document.createElement('td');
        lastNameTd.textContent = el.lastName;
        trElement.appendChild(lastNameTd);

        let facultyNumberTd = document.createElement('td');
        facultyNumberTd.textContent = el.facultyNumber;
        trElement.appendChild(facultyNumberTd);

        let gradeTd = document.createElement('td');
        gradeTd.textContent = el.grade;
        trElement.appendChild(gradeTd);

        tbody.appendChild(trElement);
    });

    // Submit button event
    submitBtn.addEventListener('click', newStudent);

    // Submit button functionality
    function newStudent(ev) {
        ev.preventDefault();

        // Data Non-empty validation
        if (firstName.value && lastName.value && facultyNumber.value && grade.value) {

            // Setting data for POST request
            let data = {
                'First Name': firstName.value,
                'Last Name': lastName.value,
                'Faculty Number': facultyNumber.value,
                'Grade': Number(grade.value)
            };

            // Post request for the server
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Apeending the new information to the DOM tree table
            let tr = document.createElement('tr');

            let firstNameTd = document.createElement('td');
            firstNameTd.textContent = firstName.value;
            tr.appendChild(firstNameTd);

            let lastNameTd = document.createElement('td');
            lastNameTd.textContent = lastName.value;
            tr.appendChild(lastNameTd);

            let facultyNumberTd = document.createElement('td');
            facultyNumberTd.textContent = facultyNumber.value;
            tr.appendChild(facultyNumberTd);

            let gradeTd = document.createElement('td');
            gradeTd.textContent = Number(grade.value);
            tr.appendChild(gradeTd);

            tbody.appendChild(tr);

            // Clearing inputs
            firstName.value = '';
            lastName.value = '';
            facultyNumber.value = '';
            grade.value = '';
        }
    }
}
attachEvents();