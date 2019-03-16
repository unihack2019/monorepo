import React from 'react';
import { Typography, Card, withStyles } from '@material-ui/core';
import JobTechnology from './TechnologyChip';
import CompanyDrawer from './CompanyDrawer';
import { observer } from 'mobx-react';
import store from './store';
import { Route } from 'react-router';

const styles = {
  card: {
    padding: '10px',
    marginBottom: '20px',
  },
  techList: {
    display: 'flex',
  },
  tech: {
    marginRight: '10px',
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
        <Typography variant="headline" component="h3">
          {job.title}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <span dangerouslySetInnerHTML={{ __html: job.summary }} />
        </Typography>
        <div className={classes.techList}>
          {job.technologies.map(technology => (
            <JobTechnology technology={technology} className={classes.tech} />
          ))}
        </div>
      </Card>
    )}
  />
);
const StyledJobItem = withStyles(styles)(JobItem);

const pageStyles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: 'auto',
  },
};
const JobListPage = observer(({ classes }) => (
  <>
    <CompanyDrawer />
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
  </>
));

export default withStyles(pageStyles)(JobListPage);
