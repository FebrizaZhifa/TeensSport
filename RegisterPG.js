// JavaScript for handling the register form interactions

// Select form elements
const registerForm = document.querySelector("form");
const usernameInput = registerForm.querySelector("input[type='string']");
const emailInput = registerForm.querySelector("input[type='email']");
const passwordInput = registerForm.querySelector("input[type='password']");

// Event listener for form submission
registerForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Simple validation
  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate registration process (replace with actual API call if needed)
  const newUser = { username, email, password };
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    alert("Email is already registered.");
    return;
  }

  // Save user data in localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");

  // Redirect to login page
  window.location.href = "LoginPG.html";
});
