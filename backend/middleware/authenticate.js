const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token tidak tersedia' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ message: 'Token tidak valid' });
    }
};

module.exports = authenticate;
