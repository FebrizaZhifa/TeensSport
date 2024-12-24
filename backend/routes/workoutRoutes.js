const express = require('express');
const { createWorkout, getWorkouts, updateWorkout, deleteWorkout, getWorkoutById } = require('../controllers/workoutController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Endpoint untuk CRUD workout


router.get('/:id', authenticate, getWorkoutById);
router.post('/', authenticate, createWorkout);
router.get('/', authenticate, getWorkouts);
router.put('/:id', authenticate, updateWorkout);
router.delete('/:id', authenticate, deleteWorkout);

module.exports = router;
