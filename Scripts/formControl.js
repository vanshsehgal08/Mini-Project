const genderRadios = document.querySelectorAll(".gender-labels-hidden");
const genderInputs = document.querySelectorAll(".gender-inputs");
const loginForm = document.querySelector(".login-form");
const employeeRadio = document.querySelector(".signup-employee #employee");
const employeeLabel = document.querySelector(".employee-label");
const signupForm = document.querySelector(".signup-form");
const employeeCheckbox = document.querySelector(".signup-employee .checkbox-ball");

const User = function (name, email, password, phone, height, weight, medicalHistory, medications, allergies, gender) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.phone = phone;
  this.height = height;
  this.weight = weight;
  this.medicalHistory = medicalHistory;
  this.medications = medications;
  this.allergies = allergies;
  this.gender = gender; // Add gender parameter
};


genderInputs.forEach((input) =>
  input.addEventListener("change", () => {
    genderRadios.forEach((el) => el.classList.toggle("radio-checked"));
  })
);
employeeRadio.addEventListener("change", () => {
  employeeLabel.classList.toggle("active");
  employeeCheckbox.classList.toggle("active");
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = signupForm.querySelector(".firstname").value;
  const lastName = signupForm.querySelector(".lastname").value;
  const phone = signupForm.querySelector(".phone").value;
  const email = signupForm.querySelector(".email").value;
  const password = signupForm.querySelector(".password").value;
  const height = parseInt(signupForm.querySelector(".height").value); // Parse height as integer
  const weight = parseInt(signupForm.querySelector(".weight").value); // Parse weight as integer
  const medicalHistory = signupForm.querySelector(".medical-history").value;
  const medications = signupForm.querySelector(".medications").value;
  const allergies = signupForm.querySelector(".allergies").value;

  const genderInputs = document.querySelectorAll('input[name="gender"]');
  let selectedGender = '';
  genderInputs.forEach((input) => {
    if (input.checked) {
      selectedGender = input.value;
    }
  });

  const elements = [
    signupForm.querySelector(".firstname"),
    signupForm.querySelector(".lastname"),
    signupForm.querySelector(".phone"),
    signupForm.querySelector(".password"),
    signupForm.querySelector(".email"),
    signupForm.querySelector(".height"),
    signupForm.querySelector(".weight"),
  ];

  const errors = [];
  if (firstName.length < 3) {
    elements[0].style.border = "2px solid red";
    errors.push("First Name must contain at least 3 characters.");
  } else elements[0].style.border = "none";

  // Add validation for last name, similar to first name validation

  if (!Number(phone)) {
    elements[2].style.border = "2px solid red";
    errors.push("Invalid phone number");
  } else elements[2].style.border = "none";

  // Add validation for password length, similar to first name validation

  if (!email.trim()) {
    elements[4].style.border = "2px solid red";
    errors.push("Email is required");
  } else {
    elements[4].style.border = "none";
    if (!isAvailable(email)) {
      elements[4].style.border = "2px solid red";
      errors.push("Email already exists");
    }
  }

  // Add validation for height
  if (isNaN(height) || height <= 0) {
    elements[5].style.border = "2px solid red";
    errors.push("Height must be a valid positive integer");
  } else elements[5].style.border = "none";

  // Add validation for weight
  if (isNaN(weight) || weight <= 0) {
    elements[6].style.border = "2px solid red";
    errors.push("Weight must be a valid positive integer");
  } else elements[6].style.border = "none";

  if (errors.length) {
    alert(errors.join("\n"));
  } else {
    saveAccount(firstName, lastName, email, password, phone, height, weight, medicalHistory, medications, allergies, selectedGender);
    alert("Account created successfully!");
    window.location.href = '../Views/login.html';
  }
});


function saveAccount(firstName, lastName, email, password, phone, height, weight, medicalHistory, medications, allergies, gender) {
  let acc = JSON.parse(localStorage.getItem("account")) || [];
  acc.push(new User(firstName + " " + lastName, email, password, phone, height, weight, medicalHistory, medications, allergies, gender)); // Include gender
  localStorage.setItem("account", JSON.stringify(acc));
}


function isAvailable(email) {
  const acc = JSON.parse(localStorage.getItem("account")) || [];
  return !acc.some((user) => user.email === email);
}
