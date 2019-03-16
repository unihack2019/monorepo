import React from 'react';
import { Avatar, Card, CardHeader, CardContent, withStyles } from '@material-ui/core';

const styles = {
  p: {
    margin: 0,
  },
  content: {
    paddingTop: 0,
  },
};

const TechCard = ({ classes, className, icon }) => (
  <Card className={className}>
    <CardHeader title="Java" avatar={<Avatar src={icon}></Avatar>} />
    <CardContent className={classes.content}>
      <p className={classes.p}>3 Repos</p>
      <p className={classes.p}>234 IntelliPoints</p>
    </CardContent>
  </Card>
);

export default withStyles(styles)(TechCard);
