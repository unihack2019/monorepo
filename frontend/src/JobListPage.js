import React from 'react';
import { Typography, Card, withStyles } from '@material-ui/core';
import JobTechnology from './TechnologyChip';
import CompanyDrawer from './CompanyDrawer';

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
  }
};
const JobItem = ({ job, classes }) => (
  <Card className={classes.card}>
    <Typography variant="headline" component="h3">
      {job.title}
    </Typography>
    <Typography variant="body1" component="p" gutterBottom>
      {job.description}
    </Typography>
    <div className={classes.techList}>
      {job.technologies.map(technology => (
        <JobTechnology technology={technology} className={classes.tech} />
      ))}
    </div>
  </Card>
);
const StyledJobItem = withStyles(styles)(JobItem);

const jobs = [
  {
    title: 'Bleh',
    description: 'Swek',
    technologies: [
      {
        name: 'Freaking',
      },
      {
        name: 'Rawr',
      },
    ],
  },
  {
    title: 'OMG so swek',
    description: 'rawr',
    technologies: [
      {
        name: 'Hi david',
      },
      {
        name: 'express',
      },
      {
        name: 'TypeScript',
      },
    ],
  },
];

const pageStyles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: 'auto',
  }
}
const JobListPage = ({ classes }) => (
  <>
    <CompanyDrawer />
    <div className={classes.container}>
      <Typography component="h1" variant="h4" gutterBottom>
        Your Job Listings
      </Typography>
      {jobs.map(job => <StyledJobItem job={job} />)}
    </div>
  </>
);

export default withStyles(pageStyles)(JobListPage);
