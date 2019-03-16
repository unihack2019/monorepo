import React from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core'; 
import icon from './icon';

const TechnologyChip = withStyles((theme) => ({
  chip: {
    margin: theme.spacing.unit
  }
}), { withTheme: true })(({ technology, classes }) => (
  <Chip 
    avatar={<Avatar alt={technology.name} src={icon(technology.name)}/>}
    label={technology.name} 
    className={classes.chip}
  />
));
export default TechnologyChip;