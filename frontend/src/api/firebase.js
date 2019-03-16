import firebase from 'firebase/app';
import 'firebase/firestore';
import config from '../firebaseSecret';

// Initialize Firebase
firebase.initializeApp(config);

export default firebase.firestore();
