// Event listener untuk form submit
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Mencegah halaman reload

  // Ambil data dari form
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      // Kirim data ke backend
      const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
          alert('Registration successful!');
          window.location.href = 'LoginPG.html'; // Redirect ke halaman login
      } else {
          alert('Error: ' + (result.error || 'Something went wrong'));
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error: Could not connect to the server.');
  }
});
