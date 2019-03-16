import React, { Component } from 'react';

export default class Github extends Component {
  async componentDidMount() {
    const search = this.props.location.search;
    console.log(this.props.location.search);
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get('code');

    const authResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/github/${code}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    const githubId = await authResponse.json();

    this.props.history.push('/');
  }

  render() {
    return null;
  }
}
