const router = require('express').Router();
const db = require('../models');

/**
 * Route to obtain all workouts with associated exercise details.
 */
router.get('/api/workouts', async (req, res) => {
	try {
		const workouts = await db.Workout.aggregate([
			{
				$lookup: {
					from: 'exercises',
					localField: 'exercises',
					foreignField: '_id',
					as: 'exercises',
				},
			},
			{
				$addFields: {
					totalDuration: {
						$sum: '$exercises.duration',
					},
				},
			},
		]);
		res.json(workouts);
	} catch (error) {
		res.json(error);
	}
});

/**
 * Route to obtain the 7 most recent workouts with associated exercise details.
 */
router.get('/api/workouts/range', async (req, res) => {
	try {
		const workouts = await db.Workout.aggregate([
			{
				$lookup: {
					from: 'exercises',
					localField: 'exercises',
					foreignField: '_id',
					as: 'exercises',
				},
			},
			{
				$sort: {
					day: -1,
				},
			},
			{
				$limit: 7,
			},
			{
				$addFields: {
					totalDuration: {
						$sum: '$exercises.duration',
					},
				},
			},
		]);

		res.json(workouts);
	} catch (error) {
		res.json(error);
	}
});

/**
 * Route to add an exercise to an existing workout, specified by 'id'.
 */
router.put('/api/workouts/:id', async (req, res) => {
	try {
		const exercise = await db.Exercise.create(req.body);
		const workout = await db.Workout.findByIdAndUpdate(
			req.params.id,
			{ $push: { exercises: exercise._id } },
			{ new: true }
		).exec();
		res.json(workout);
	} catch (error) {
		res.json(error);
	}
});

/**
 * Route to create a new workout.
 */
router.post('/api/workouts', async (req, res) => {
	try {
		const workout = await db.Workout.create(req.body);
		res.json(workout);
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
