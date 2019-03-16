import React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

const styles = {
  container: {
    borderRadius: '9999px',
    border: '10px solid',
    borderColor: '#fff',
    width: '100px',
    height: '100px',
  },
  poor: {
    borderColor: '#F44336',
  },
  moderate: {
    borderColor: '#FFC107',
  },
  strong: {
    borderColor: '#CDDC39',
  },
  verystrong: {
    borderColor: '#4CAF50',
  },
  image: {
    borderRadius: '9999px',
    width: '100%',
    height: '100%',
  },
}

const ProfileAvatar = ({ match, classes, avatar_url="https://avatars0.githubusercontent.com/u/9994172?s=460&v=4" }) => (
  <div className={classnames(classes.container, classes[match])}>
    <img
      alt="Avatar"
      className={classes.image}
      src={avatar_url}
    />
  </div>
);
export default withStyles(styles)(ProfileAvatar);
