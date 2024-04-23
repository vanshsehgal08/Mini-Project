document.addEventListener('DOMContentLoaded', function () {
    // Fetch user data from local storage
    const accountDataString = localStorage.getItem('account');
    if (accountDataString) {
        const accountData = JSON.parse(accountDataString);
        // Get the email of the logged-in user from local storage
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        // Find the user data that matches the logged-in user's email
        const userData = accountData.find(user => user.email === loggedInUserEmail);
        if (userData) {
            // Update name, phone number, height, weight, medical history, medications, and allergies
            document.getElementById('userName').innerHTML = `<strong>Name:</strong> ${userData.name}`;
            document.getElementById('userPhone').innerHTML = `<strong>Phone No:</strong> ${userData.phone}`;
            document.getElementById('userHeight').innerHTML = `<strong>Height:</strong> ${userData.height}cm`;
            document.getElementById('userWeight').innerHTML = `<strong>Weight:</strong> ${userData.weight}Kg`;
            document.getElementById('userMedicalHistory').innerHTML = `<strong>Medical History (if any):</strong> ${userData.medicalHistory}`;
            document.getElementById('userMedications').innerHTML = `<strong>Current Medications:</strong> ${userData.medications}`;
            document.getElementById('userAllergies').innerHTML = `<strong>Current Allergies:</strong> ${userData.allergies}`;
            
            // Populate the edit profile form with user data
            document.getElementById('editName').value = userData.name;
            document.getElementById('editPhone').value = userData.phone;
            document.getElementById('editHeight').value = userData.height;
            document.getElementById('editWeight').value = userData.weight;
            document.getElementById('editMedicalHistory').value = userData.medicalHistory;
            document.getElementById('editMedications').value = userData.medications;
            document.getElementById('editAllergies').value = userData.allergies;

            // Show the edit profile form when the Edit Profile button is clicked
            const editProfileBtn = document.getElementById('editProfileBtn');
            const editProfileForm = document.getElementById('editProfileForm');
            editProfileBtn.addEventListener('click', function () {
                editProfileForm.classList.toggle('hidden');
            });

            // Handle form submission for editing profile
            editProfileForm.addEventListener('submit', function (e) {
                e.preventDefault();
                // Update user data with the form values
                userData.name = document.getElementById('editName').value;
                userData.phone = document.getElementById('editPhone').value;
                userData.height = document.getElementById('editHeight').value;
                userData.weight = document.getElementById('editWeight').value;
                userData.medicalHistory = document.getElementById('editMedicalHistory').value;
                userData.medications = document.getElementById('editMedications').value;
                userData.allergies = document.getElementById('editAllergies').value;

                // Update user data in local storage
                localStorage.setItem('account', JSON.stringify(accountData));
                // Hide the form after submission
                editProfileForm.classList.add('hidden');
                // Show a success message to the user
                alert('Profile updated successfully!');
                // Update the displayed user data
                document.getElementById('userName').innerHTML = `<strong>Name:</strong> ${userData.name}`;
                document.getElementById('userPhone').innerHTML = `<strong>Phone No:</strong> ${userData.phone}`;
                document.getElementById('userHeight').innerHTML = `<strong>Height:</strong> ${userData.height}cm`;
                document.getElementById('userWeight').innerHTML = `<strong>Weight:</strong> ${userData.weight}Kg`;
                document.getElementById('userMedicalHistory').innerHTML = `<strong>Medical History (if any):</strong> ${userData.medicalHistory}`;
                document.getElementById('userMedications').innerHTML = `<strong>Current Medications:</strong> ${userData.medications}`;
                document.getElementById('userAllergies').innerHTML = `<strong>Current Allergies:</strong> ${userData.allergies}`;
            });
        }
    }


    const deleteProfileBtn = document.getElementById('deleteProfileBtn');
    deleteProfileBtn.addEventListener('click', function () {
        // Prompt the user for their password
        const password = prompt('Please enter your password to delete your account:');
        if (password !== null) {
            // Fetch user data from local storage
            const accountDataString = localStorage.getItem('account');
            if (accountDataString) {
                const accountData = JSON.parse(accountDataString);
                // Get the email of the logged-in user from local storage
                const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
                // Find the user data that matches the logged-in user's email
                const userData = accountData.find(user => user.email === loggedInUserEmail);
                if (userData) {
                    // Check if the entered password matches with the user's password
                    if (password === userData.password) {
                        // Delete the account from local storage
                        accountData.splice(accountData.indexOf(userData), 1);
                        localStorage.setItem('account', JSON.stringify(accountData));
                        // Show a popup indicating successful deletion
                        alert('Your account has been successfully deleted.');
                        // Redirect the user to the home page or logout
                        window.location.href = '../index.html'; // Change the URL if needed
                    } else {
                        alert('Incorrect password. Please try again.');
                    }
                }
            }
        }
    });
});

