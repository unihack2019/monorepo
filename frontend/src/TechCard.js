import React from 'react';
import icon from './icon';
import { Avatar, Card, CardHeader, CardContent, Typography, withStyles } from '@material-ui/core';
import store from './store';
const styles = {
  content: {
    paddingTop: 0,
  },
};

const TechCard = ({ classes, className, technology, applicant, index }) => (
  <Card className={className}>
    <CardHeader title={technology.name} avatar={<Avatar src={icon(technology.name)} />} />
    <CardContent className={classes.content}>
      <Typography component="p" variant="body1" gutterBottom>
        {store.repositoriesByTechnology(technology, applicant.repositories).length} Repos
      </Typography>
      <Typography component="p" variant="body1">
        {Math.round(technology.score / (index + 1))} IntelliPoints
      </Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(TechCard);
