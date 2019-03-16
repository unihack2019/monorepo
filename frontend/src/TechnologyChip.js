import React from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core';
import icon from './icon';

const TechnologyChip = withStyles(
  theme => ({
    avatar: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      fill: '#FFF',
    },
  }),
  { withTheme: true },
)(({ technology, classes, avatar }) => {
  const theIcon = icon(technology.name);
  return (
    <Chip
      avatar={
        theIcon ? (
          <Avatar alt={technology.name} src={theIcon} className={classes.avatar} {...avatar} />
        ) : (
          <Avatar alt={technology.name} className={classes.avatar} {...avatar}>
            {technology.name.slice(0, 1).toUpperCase()}
          </Avatar>
        )
      }
      label={technology.name}
      className={classes.chip}
    />
  );
});
export default TechnologyChip;
