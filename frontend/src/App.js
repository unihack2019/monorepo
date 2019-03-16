import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home';
import JobListPage from './JobListPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/jobs" component={JobListPage} />
      </Router>
    );
  }
}

export default App;
