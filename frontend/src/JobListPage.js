import React from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core';
function stripTechName(name) {
  return name.toLowerCase().replace(/-/g, '');
}

const JobTechnology = withStyles((theme) => ({
  chip: {
    margin: theme.spacing.unit
  }
}), { withTheme: true })(({ technology, classes }) => (
  <Chip 
    avatar={<Avatar alt={technology.name} src={require('./devicons')[stripTechName(technology.name)]}/>}
    label={technology.name} 
    className={classes.chip}
  />
));

const JobItem = withStyles({
  tech: {
    display: 'flex',
  }
})(({ job, classes }) => (
  <section>
    <h1>{job.title}</h1>
    <p>{job.description}</p>
    <div className={classes.tech}>{
      job.technologies.map(technology => (
        <JobTechnology technology={technology}/>
      ))
    }</div>
  </section>
));

const jobs = [
  {
    title: 'Bleh',
    description: 'Swek',
    technologies: [{
      name: 'Freaking awesome pants swekness lol'
    }, {
      name: 'Rawr',
    }]
  },
  {
    title: 'OMG so swek',
    description: 'rawr',
    technologies: [{
      name: 'Hi david',
    }, {
      name: 'express'
    }, {
      name: 'TypeScript'
    }]
  }
];

export default () => (
  jobs.map(job => <JobItem job={job}/>)
);
