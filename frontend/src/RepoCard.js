import React from 'react';
import { Avatar, Card, CardHeader, CardContent, Typography, withStyles } from '@material-ui/core';

const styles = {
  content: {
    paddingTop: 0,
  },
};

const RepoCard = ({ classes, className, name }) => (
  <Card className={className}>
    <CardHeader title={name} />
    <CardContent className={classes.content}>
      <Typography component="p" variant="body1" gutterBottom>
        Chips 🍟
      </Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(RepoCard);
