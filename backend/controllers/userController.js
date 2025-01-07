const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Fungsi untuk Mereset ID
async function resetAutoIncrement() {
  await pool.query('ALTER TABLE user AUTO_INCREMENT = 1');
}

// Registrasi User
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Periksa apakah email sudah ada
      const [existingUser] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Email sudah terdaftar' });
      }
  
      // Hash password dan tambahkan pengguna baru
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
      res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saat registrasi' });
    }
  };
  

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saat login' });
  }
};

// Hapus Semua User dan Reset ID
exports.deleteAllUsers = async (req, res) => {
  try {
    await pool.query('DELETE FROM user'); // Hapus semua data
    await resetAutoIncrement(); // Reset auto-increment
    res.status(200).json({ message: 'Semua user berhasil dihapus dan ID direset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saat menghapus semua user' });
  }
};
