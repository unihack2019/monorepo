import React from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core'; 
import icon from './icon';

const TechnologyChip = withStyles((theme) => ({
  avatar: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    fill: '#FFF'
  }
}), { withTheme: true })(({ technology, classes, avatar }) => (
  <Chip 
    avatar={<Avatar alt={technology.name} src={icon(technology.name)} className={classes.avatar} {...avatar}/>}
    label={technology.name} 
    className={classes.chip}
  />
));
export default TechnologyChip;