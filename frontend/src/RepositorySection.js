import React from 'react';
import { Typography } from '@material-ui/core';
import RepositoryCard from './RepositoryCard';

const RepositorySection = ({ repositories }) => (
  <section>
    <Typography variant="h1" component="h1">
      Repositories
    </Typography>
    {repositories.map(repository => <RepositoryCard repoistory={repository}/>)}
  </section>
);

export default RepositorySection;
