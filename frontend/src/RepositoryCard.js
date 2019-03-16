import React from 'react';
import TechnologyChip from './TechnologyChip';
import { withStyles, Card, Typography } from '@material-ui/core';

const RepositoryCard = withStyles({
  
})(({ repository }) => (
  <section>
    <Card>
      <Typography variant='h1' component='h1'>
        {repository.title}
      </Typography>
      <TechnologyChip
        technology={repository.technology} 
      />  
    </Card>
  </section>
));

export default RepositoryCard;
