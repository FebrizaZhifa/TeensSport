const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, "../"))); // Arahkan ke folder root frontend

// Routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);

// Handle root path "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Middleware CSP (Tambahkan sebelum app.listen)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Jalankan server
const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Export server untuk digunakan di file test
module.exports = server;
