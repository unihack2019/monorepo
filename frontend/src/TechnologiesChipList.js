import React from 'react';
import TechnologyChip from './TechnologyChip';
const TechnologiesChipList = ({ technologies }) => (
  <>
    {technologies.map(technology => <TechnologyChip technology={technology}/>)}
  </>
);
export default TechnologiesChipList;