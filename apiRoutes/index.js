const router = require('express').Router();
const db = require('../models');

router.get('/api/workouts', async (req, res) => {
	try {
		// We use '.exec()' here to obtain a more complete stacktrace in the event of an error, per the Mongoosejs documentation...
		const workout = await db.Workout.find({}).exec();
		res.json(workout);
	} catch (error) {
		res.json(error);
	}
});

router.get('/api/workouts/range', async (req, res) => {});

router.put('/api/workouts/:id', async (req, res) => {
	try {
		const exercise = await db.Exercise.create(req.body);
		const workout = await db.Workout.findOneAndUpdate(
			{ _id: mongoose.ObjectId(req.params.id) },
			{ $push: { exercises: exercise._id } },
			{ new: true }
		);
		res.json(workout);
	} catch (error) {
		res.json(error);
	}
});

router.post('/api/workouts', async (req, res) => {
	try {
		const workout = await db.Workout.create(req.body);
		res.json(workout);
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
