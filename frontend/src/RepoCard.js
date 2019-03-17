import React from 'react';
import { Avatar, Card, CardHeader, CardContent, Typography, withStyles } from '@material-ui/core';
import TechnologiesChipList from './TechnologiesChipList';
import classnames from 'classnames';
import { Route } from 'react-router';
const styles = {
  content: {
    paddingTop: 0,
  },
  cardThing: {
    cursor: 'pointer',
  },
};

const RepoCard = ({ classes, className, repository }) => (
  <Route
    render={route => (
      <Card
        className={classnames(className, classes.cardThing)}
        onClick={() => {
          window.location = repository.githubRepo.html_url;
        }}
      >
        <CardHeader title={repository.githubRepo.name} />
        <CardContent className={classes.content}>
          <TechnologiesChipList technologies={repository.technologies.slice(0, 5)} />
        </CardContent>
      </Card>
    )}
  />
);

export default withStyles(styles)(RepoCard);
