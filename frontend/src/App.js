import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home';
import Github from "./api/Github";
import JobListPage from './JobListPage';
import JobViewerPage from './JobViewerPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/github" component={Github} />
        <Route path="/" exact component={Home} />
        <Route path="/jobs" exact component={JobListPage} />
        <Route path="/jobs/:id" component={JobViewerPage} />
      </Router>
    );
  }
}

export default App;
