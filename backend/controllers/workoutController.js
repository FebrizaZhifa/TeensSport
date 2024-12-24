const pool = require('../db');

// Buat Workout Baru
exports.createWorkout = async (req, res) => {
    const { name, exercises, day } = req.body;

    try {
        const [existingWorkout] = await pool.query(
            'SELECT * FROM workout WHERE day = ? AND user_id = ?',
            [day, req.userId]
        );

        if (existingWorkout.length > 0) {
            return res.status(400).json({ error: 'Workout untuk hari ini sudah ada. Silakan edit atau hapus workout yang ada.' });
        }

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
            query += ' AND day = ?'; // Gunakan query filter berdasarkan hari
            params.push(day);
        }

        const [rows] = await pool.query(query, params);

        // Pastikan kolom exercises diubah menjadi array jika perlu
        const parsedRows = rows.map((row) => ({
            ...row,
            exercises: Array.isArray(row.exercises) ? row.exercises : JSON.parse(row.exercises || '[]'), // Parsing hanya jika tipe data string
        }));

        res.json(parsedRows);
    } catch (error) {
        console.error('Error saat mengambil workout:', error);
        res.status(500).json({ error: 'Error saat mengambil workout' });
    }
};




// Update Workout
exports.updateWorkout = async (req, res) => {
    const { name, exercises, day } = req.body;

    try {
        await pool.query(
            'UPDATE workout SET name = ?, exercises = ?, day = ? WHERE id = ? AND user_id = ?',
            [name, JSON.stringify(exercises), day, req.params.id, req.userId]
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
        console.error(error);
        res.status(500).json({ error: 'Error saat menghapus workout' });
    }
};

exports.getWorkoutById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM workout WHERE id = ? AND user_id = ?',
            [req.params.id, req.userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // Ambil data workout
        const workout = rows[0];

        // Parsing exercises jika perlu
        try {
            workout.exercises = typeof workout.exercises === 'string'
                ? JSON.parse(workout.exercises)
                : workout.exercises; // Pastikan dalam bentuk array
        } catch (error) {
            console.error('Error parsing exercises:', error);
            return res.status(500).json({ error: 'Failed to parse exercises' });
        }

        res.json(workout);
    } catch (error) {
        console.error('Error fetching workout details:', error);
        res.status(500).json({ error: 'Error fetching workout details' });
    }
};



