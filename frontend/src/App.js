import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home';
import JobListPage from './JobListPage';
import Profile from './Profile';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/jobs" component={JobListPage} />
        <Route path="/profile" component={Profile} />
      </Router>
    );
  }
}

export default App;
