import React, { Component } from 'react';
import { JobListPage } from './JobListPage';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    message: "Loading..."
  };

  componentDidMount() {
    this.props.database.collection("tests").doc("test").get().then(doc => {
      console.log(doc.data());
      this.setState({ message: JSON.stringify(doc.data()) });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            { this.state.message }
          </p>
        </header>
        <JobListPage/>
      </div>
    );
  }
}

export default App;
