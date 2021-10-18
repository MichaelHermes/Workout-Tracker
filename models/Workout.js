const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
	day: {
		type: Date,
		default: Date.now,
	},
	exercises: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Exercise',
		},
	],
});

// WorkoutSchema.virtual('totalDuration').get(function () {
// 	return this.exercises.reduce((total, exercise) => {
// 		return total + exercise.duration;
// 	}, 0);
// });

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
