/* dev */
//const morgan = require('morgan');
/* firebase */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
/* app */
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const dataRoute = require('./routes/data-route');
const port = 5555;

const app = express();
app.use(cors({ origin: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
})

// used to log api request
//app.use(morgan('combined'));

// used to have json data extracted
app.use(bodyParser.json({
	verify: (req, res, buf) => {
		req.rawBody = buf
	}
}))

// main get,post,patch,delete
app.use('/api/data', dataRoute);

app.use((req, res, next) => {
	const error = new HttpError('Go home Roger.', 404)
	throw error;
}); // used if no routes found, standard 404

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});  // overall error handler, that will either take given error or provide fallback

/* firebase */
exports.app = functions.https.onRequest(app);

/* standard */
// app.listen(port, () => {
// 	console.log(`Server listening at http://localhost:${port}`)
// })
