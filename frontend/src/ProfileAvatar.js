import React from 'react';
import { Avatar } from '@material-ui/core';
import withStyles from 'react-jss';
import classnames from 'classnames';
function matchColor(match) {
  switch (match) {
    case 'poor':
      return '#F44336';
    case 'moderate':
      return '#FFC107';
    case 'strong':
      return '#CDDC39';
    case 'verystrong':
      return '#4CAF50';
  }
}

const styles = {
  container: {
    width: ({ size }) => `${size}px`,
    height: ({ size }) => `${size}px`,
    border: ({ size, match }) => `${Math.round(size / 15)}px solid ${matchColor(match)}`,
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
};

const ProfileAvatar = ({
  match,
  classes,
  className,
  avatar_url = 'https://avatars0.githubusercontent.com/u/9994172?s=460&v=4',
  ...other
}) => (
  <Avatar
    alt="Avatar"
    src={avatar_url}
    className={classnames(className, classes[match], classes.container)}
    {...other}
  />
);
const StyledProfileAvatar = withStyles(styles)(ProfileAvatar);
const WithDefaultsAvatar = ({ size = 100, ...other }) => <StyledProfileAvatar size={size} {...other} />;
export default WithDefaultsAvatar;
