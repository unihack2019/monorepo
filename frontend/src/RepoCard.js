import React from 'react';
import { Avatar, Card, CardHeader, CardContent, Typography, withStyles } from '@material-ui/core';
import TechnologiesChipList from './TechnologiesChipList';

const styles = {
  content: {
    paddingTop: 0,
  },
};

const RepoCard = ({ classes, className, repository }) => (
  <Card className={className}>
    <CardHeader title={repository.githubRepo.name} />
    <CardContent className={classes.content}>
      <TechnologiesChipList technologies={repository.technologies.slice(0, 5)} />
    </CardContent>
  </Card>
);

export default withStyles(styles)(RepoCard);
