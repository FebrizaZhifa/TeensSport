const pool = require('../db');

// Buat Workout Baru
exports.createWorkout = async (req, res) => {
    const { name, exercises } = req.body;

    try {
        await pool.query(
            'INSERT INTO workout (name, exercises, user_id) VALUES (?, ?, ?)',
            [name, JSON.stringify(exercises), req.userId]
        );
        res.status(201).json({ message: 'Workout berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Ambil Semua Workout
exports.getWorkouts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM workout WHERE user_id = ?', [req.userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error saat mengambil workout' });
    }
};

// Update Workout
exports.updateWorkout = async (req, res) => {
    const { name, exercises } = req.body;

    try {
        await pool.query(
            'UPDATE workout SET name = ?, exercises = ? WHERE id = ? AND user_id = ?',
            [name, JSON.stringify(exercises), req.params.id, req.userId]
        );
        res.json({ message: 'Workout berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ error: 'Error saat memperbarui workout' });
    }
};

// Hapus Workout
exports.deleteWorkout = async (req, res) => {
    try {
        await pool.query('DELETE FROM workout WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
        res.json({ message: 'Workout berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: 'Error saat menghapus workout' });
    }
};
