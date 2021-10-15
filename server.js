const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./apiRoutes');

const PORT = process.env.PORT || 3000;

//const db = require('./models');

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(apiRoutes);

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/workouttracker',
	{ useNewUrlParser: true }
);

// GET route for the homepage
app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for the exercise page
app.get('/exercise', (req, res) =>
	res.sendFile(path.join(__dirname, 'public/exercise.html'))
);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
