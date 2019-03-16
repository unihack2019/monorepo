import React from 'react';
import { Typography, Card, withStyles } from '@material-ui/core';
import TechnologyChipList from './TechnologiesChipList';
import CompanyDrawer from './CompanyDrawer';
import { observer } from 'mobx-react';
import store from './store';
import { Route } from 'react-router';

const styles = {
  card: {
    padding: '20px',
    marginBottom: '20px',
  },
  techList: {
    marginBottom: '10px',
  },
};
const JobItem = ({ job, jobId, classes }) => (
  <Route
    render={router => (
      <Card
        className={classes.card}
        onClick={() => {
          router.history.push(`/jobs/${jobId}`);
        }}
      >
        <Typography variant="headline" component="h3" gutterBottom>
          {job.title}
        </Typography>
        <div className={classes.techList}>
          <TechnologyChipList technologies={job.technologies} />
        </div>
        <Typography variant="body1" component="p" gutterBottom>
          <span dangerouslySetInnerHTML={{ __html: job.summary }} />
        </Typography>
      </Card>
    )}
  />
);
const StyledJobItem = withStyles(styles)(JobItem);

const pageStyles = {
  container: {
    padding: '20px',
    maxWidth: '550px',
    margin: 'auto',
  },
};
const JobListPage = observer(({ classes }) => (
  <div className={classes.container}>
    <Typography component="h1" variant="h4" gutterBottom>
      Your Job Listings
    </Typography>
    {Object.keys(store.jobs)
      .map(key => [key, store.jobs[key]])
      .map(([key, job]) => (
        <StyledJobItem job={job} key={key} jobId={key} />
      ))}
  </div>
));

export default withStyles(pageStyles)(JobListPage);
