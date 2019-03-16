import React from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core'; 
import icon from './icon';

const TechnologyChip = withStyles((theme) => ({
}), { withTheme: true })(({ technology, classes }) => (
  <Chip 
    avatar={<Avatar alt={technology.name} src={icon(technology.name)}/>}
    label={technology.name} 
    color='primary'
    className={classes.chip}
  />
));
export default TechnologyChip;