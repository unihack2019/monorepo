import React from 'react';
import { Button, Card, withStyles } from '@material-ui/core';
import icon from './icon';

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
const GithubAuth = ({ classes }) => {
  // const clientId = '43fd6cb45d67a0b47ef4';
  const redirectUrl = `${process.env.REACT_APP_FRONTEND_URL}/github`;
  const scope = 'repo';
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <img src={icon('github')} className={classes.logo} />
        <p className={classes.text}>We need access to your Github account to determine what languages and technologies you have most experience with. Please grant us access to your repositories for our scan to work properly!</p>
        <Button
          href={`https://github.com/login/oauth/authorize?client_id=${
            process.env.REACT_APP_CLIENT_ID
          }&redirect_uri=${redirectUrl}&scope=${scope}`}
        >
          Authorize Github
        </Button>
      </Card>
    </div>
  );
};

export default withStyles(styles)(GithubAuth);
