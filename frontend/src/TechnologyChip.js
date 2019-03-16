import React from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core';
import classnames from 'classnames';
import icon from './icon';

const TechnologyChip = withStyles(
  theme => ({
    avatar: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      fill: '#FFF',
    },
  }),
  { withTheme: true },
)(({ className, technology, classes, avatar }) => (
  <Chip
    avatar={<Avatar alt={technology.name} src={icon(technology.name)} className={classes.avatar} {...avatar} />}
    label={technology.name}
    className={classnames(classes.chip, className)}
  />
));
export default TechnologyChip;
