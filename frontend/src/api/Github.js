import React, { Component } from 'react';
import { Button, Card, withStyles } from '@material-ui/core';
import icon from '../icon';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  logo: {
    maxWidth: '200px',
    padding: '20px 50px',
    margin: 'auto',
    display: 'block',
  },
  text: {
    maxWidth: '400px',
  },
  card: {
    padding: '20px',
  }
};
class Github extends Component {
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
    const { classes } = this.props;
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
export default withStyles(styles)(Github);
