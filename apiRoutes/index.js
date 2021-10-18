const router = require('express').Router();
const db = require('../models');

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

router.put('/api/workouts/:id', async (req, res) => {
	try {
		const exercise = await db.Exercise.create(req.body);
		const workout = await db.Workout.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { exercises: exercise._id } },
			{ new: true }
		).exec();
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
