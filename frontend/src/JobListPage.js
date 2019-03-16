import React from 'react';

const JobTechnology = ({ technology }) => (
  <div>{technology.name}</div>
);

const JobItem = ({ job }) => (
  <section>
    <h1>{job.title}</h1>
    <p>{job.description}</p>
    <div>{
      job.technologies.map(technology => (
        <JobTechnology technology={technology}/>
      ))
    }</div>
  </section>
);

const jobs = [
  {
    title: 'Bleh',
    description: 'Swek',
    technologies: ['Freaking awesome pants swekness lol']
  },
  {
    title: 'OMG so swek',
    description: 'rawr',
    technologies: ['Hi david']
  }
];

export const JobListPage = () => (
  jobs.map(job => <JobItem job={job}/>)
);
