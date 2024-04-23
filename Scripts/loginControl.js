const loginForm = document.querySelector(".login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Get the email and password values
  const userEmail = email.value;
  const userPassword = password.value;

  // Verify the email and password
  if (!verify(userEmail, userPassword)) {
    alert("Incorrect email or password");
  } else {
    // Store the logged-in user's email in local storage
    localStorage.setItem('loggedInUserEmail', userEmail);
    // Redirect to the home page after successful login
    window.location.href = "home.ejs"; // Replace "home.ejs" with the URL of your home page
  }
});

function verify(email, password) {
  // Retrieve user data from local storage
  let acc = JSON.parse(localStorage.getItem("account")) || [];
  
  // Check if the provided email and password match any user in the stored data
  return acc.some((user) => user.email === email && user.password === password);
}
