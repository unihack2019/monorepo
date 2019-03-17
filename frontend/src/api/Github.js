import React, { Component } from 'react';

export default class Github extends Component {
  async componentDidMount() {
    const search = this.props.location.search;
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get('code');

    const authResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/github/${code}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    const githubId = await authResponse.json();

  }

  render() {
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <img src={icon('github')} className={classes.logo} />
          <p className={classes.text}>Authentication successful! The HR team will get back to you soon.</p>
        </Card>
      </div>
    );
  }
}
