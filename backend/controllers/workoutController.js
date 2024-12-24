const pool = require('../db');

// Buat Workout Baru
exports.createWorkout = async (req, res) => {
    const { name, exercises, day } = req.body;

    try {
        // Periksa apakah sudah ada workout untuk hari tersebut
        const [existingWorkout] = await pool.query(
            'SELECT * FROM workout WHERE day = ? AND user_id = ?',
            [day, req.userId]
        );

        if (existingWorkout.length > 0) {
            return res.status(400).json({ error: 'Workout untuk hari ini sudah ada. Silakan edit atau hapus workout yang ada.' });
        }

        // Tambahkan workout baru jika belum ada
        await pool.query(
            'INSERT INTO workout (name, exercises, day, user_id) VALUES (?, ?, ?, ?)',
            [name, JSON.stringify(exercises), day, req.userId]
        );

        res.status(201).json({ message: 'Workout berhasil ditambahkan' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saat menambahkan workout' });
    }
};


// Ambil Semua Workout
exports.getWorkouts = async (req, res) => {
    const { day } = req.query; // Ambil filter "day" dari query params jika ada

    try {
        let query = 'SELECT * FROM workout WHERE user_id = ?';
        const params = [req.userId];

        if (day) {
            query += ' AND FIND_IN_SET(?, day)';
            params.push(day);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error saat mengambil workout' });
    }
};

// Update Workout
exports.updateWorkout = async (req, res) => {
    const { name, exercises, day } = req.body; // Tambahkan "day" ke dalam request body

    try {
        await pool.query(
            'UPDATE workout SET name = ?, exercises = ?, day = ? WHERE id = ? AND user_id = ?',
            [name, JSON.stringify(exercises), day, req.params.id, req.userId] // Simpan hari sebagai string
        );
        res.json({ message: 'Workout berhasil diperbarui' });
    } catch (error) {
        console.error(error);
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
