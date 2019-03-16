import React, { Component } from "react";

export default class Github extends Component {
  async componentDidMount() {
    const search = this.props.location.search;
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get('code');

    const response = await fetch(`http://localhost:3001/github/${code}` , {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
    });

    const json = await response.json();

    console.log(json.access_token);

    this.props.history.push('/');
  }

  render() {
    return null;
  }
}