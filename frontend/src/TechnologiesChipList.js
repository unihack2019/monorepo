import React from 'react';
import { withStyles } from '@material-ui/core';
import TechnologyChip from './TechnologyChip';
const TechnologiesChipList = withStyles(theme => {
  const verticalMargin = theme.spacing.unit / 2;
  return {
    list: {
      '&>*:not(:last-child)': {
        marginRight: theme.spacing.unit,
        marginBottom: verticalMargin,
        marginTop: verticalMargin,
      },
    },
  };
})(({ technologies, classes }) => (
  <div className={classes.list}>
    {technologies.map((technology, i) => (
      <TechnologyChip key={i} technology={technology} />
    ))}
  </div>
));
export default TechnologiesChipList;
