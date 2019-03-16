import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = {
  hero: {
    height: '400px',
    background: 'linear-gradient(rgba(0, 119, 181, 0.3), rgba(0, 119, 181, 0.3)), url(stock-image.jpg)',
    backgroundSize: 'cover',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
  },
  heroText: {
    flex: '1 1 auto',
    textAlign: 'center',
  },
  h: {
    color: '#fff',
    fontWeight: 700,
  },
  container: {
    maxWidth: '900px',
  },
};

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.hero}>
          <div class={classes.heroText}>
            <Typography component="h1" variant="h2" gutterBottom className={classes.h}>
              Hire Me
            </Typography>
            <Typography component="h2" variant="h6" gutterBottom className={classes.h}>
              The smart way to vet technical candidates
            </Typography>
          </div>
        </div>
        <div className={classes.container}>
          Blah blah
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Home);
