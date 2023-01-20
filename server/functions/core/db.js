const admin = require('firebase-admin');

// used for external server
// const serviceAccount = require('./auth.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// used for firebase server
admin.initializeApp();

const db = admin.firestore();


module.exports = db;