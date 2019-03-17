import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Github from './api/Github';
import GithubAuth from './GithubAuth';
import JobListPage from './JobListPage';
import Profile from './Profile';
import ErrorPage from './ErrorPage';
import JobViewerPage from './JobViewerPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/github" component={Github} />
          <Route path="/jobs" exact component={JobListPage} />
          <Route path="/jobs/:jobId" component={JobViewerPage} />
          <Route path="/github_auth" component={GithubAuth} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
