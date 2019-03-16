import React from 'react';
import { Avatar, Card, CardHeader, CardContent, Typography, withStyles } from '@material-ui/core';

const styles = {
  content: {
    paddingTop: 0,
  },
};

const TechCard = ({ classes, className, name, icon, repos, points }) => (
  <Card className={className}>
    <CardHeader title={name} avatar={<Avatar src={icon} />} />
    <CardContent className={classes.content}>
      <Typography component="p" variant="body1" gutterBottom>
        {repos} Repos
      </Typography>
      <Typography component="p" variant="body1">
        {points} IntelliPoints
      </Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(TechCard);
