const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Validasi keberadaan dan format header Authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Authorization header tidak valid atau tidak tersedia' });
    }

    const token = authHeader.split(' ')[1]; // Ambil token setelah "Bearer "

    // Verifikasi token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.userId = decoded.id; // Simpan user ID di objek req untuk digunakan di endpoint lain
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token telah kedaluwarsa' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token tidak valid' });
        }
        // Untuk error lain yang tidak terduga
        console.error('JWT verification error:', error); // Log error untuk debugging
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = authenticate;
