import React from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core'; 
function stripTechName(name) {
  return name.toLowerCase().replace(/-/g, '');
}

const TechnologyChip = withStyles((theme) => ({
  chip: {
    margin: theme.spacing.unit
  }
}), { withTheme: true })(({ technology, classes }) => (
  <Chip 
    avatar={<Avatar alt={technology.name} src={require('./devicons')[stripTechName(technology.name)]}/>}
    label={technology.name} 
    className={classes.chip}
  />
));
export default TechnologyChip;