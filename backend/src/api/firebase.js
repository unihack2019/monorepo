const firebase = require('firebase/app');
require('firebase/firestore');
const config = require("../firebaseSecret");

// Initialize Firebase
firebase.initializeApp(config);

module.exports = firebase.firestore();
