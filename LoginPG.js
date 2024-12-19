// JavaScript for handling the login form interactions

// Select form elements
const loginForm = document.querySelector("form");
const emailInput = loginForm.querySelector("input[type='email']");
const passwordInput = loginForm.querySelector("input[type='password']");
const rememberMeCheckbox = loginForm.querySelector("input[type='checkbox']");

// Event listener for form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  const email = emailInput.value;
  const password = passwordInput.value;
  const rememberMe = rememberMeCheckbox.checked;

  // Simple validation
  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  // Simulate login process (replace with actual API call if needed)
  if (email === "test@example.com" && password === "password123") {
    alert("Login successful!");

    if (rememberMe) {
      // Save user data in localStorage for persistence
      localStorage.setItem("user", JSON.stringify({ email }));
    }

    // Redirect or show success page (if applicable)
    window.location.href = "dashboard.html"; // Change to your actual dashboard page
  } else {
    alert("Invalid email or password.");
  }
});

// Check if user data is already stored in localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser) {
  emailInput.value = storedUser.email;
  rememberMeCheckbox.checked = true;
}
