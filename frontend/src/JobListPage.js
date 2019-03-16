import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import JobTechnology from './TechnologyChip';

const JobItem = withStyles({
  tech: {
    display: 'flex',
  },
})(({ job, classes }) => (
  <section>
    <Typography variant="h1" component="h1">
      {job.title}
    </Typography>
    <Typography variant="p" component="p" />
    <p>{job.description}</p>
    <div className={classes.tech}>
      {job.technologies.map(technology => (
        <JobTechnology technology={technology} />
      ))}
    </div>
  </section>
));

const jobs = [
  {
    title: 'Bleh',
    description: 'Swek',
    technologies: [
      {
        name: 'Freaking awesome pants swekness lol',
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

const JobListPage = () => (
  <div>
    {jobs.map(job => (
      <JobItem job={job} />
    ))}
  </div>
);

export default JobListPage;
