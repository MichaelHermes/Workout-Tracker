const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./apiRoutes');

const PORT = process.env.PORT || 3000;

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

/** Add routing for HTML pages (i.e. views).
 * Due to the simplicity of these routes, they are implemented in this server.js file instead of a separaqte 'homeroutes.js' file.*/
// GET route for the homepage
app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for the exercise page
app.get('/exercise', (req, res) =>
	res.sendFile(path.join(__dirname, 'public/exercise.html'))
);

// GET route for the stats page
app.get('/stats', (req, res) =>
	res.sendFile(path.join(__dirname, 'public/stats.html'))
);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
