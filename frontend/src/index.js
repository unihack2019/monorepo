import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './index.css';
import App from './App';
import config from "./firebaseSecret";

// Initialize Firebase
firebase.initializeApp(config);

ReactDOM.render(
  <App
    database={firebase.firestore()}
  />,
  document.getElementById('root')
);
