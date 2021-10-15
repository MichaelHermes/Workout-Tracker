const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
	type: String, // Enumeration?
	weight: Number,
	sets: Number,
	reps: Number,
	distance: Number,
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
