import React from 'react';
import { withStyles } from '@material-ui/core';
import TechnologyChip from './TechnologyChip';
import classnames from 'classnames';

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
})(({ technologies, classes, className }) => (
  <div className={classnames(classes.list, className)}>
    {technologies.map((technology, i) => (
      <TechnologyChip key={i} technology={technology} />
    ))}
  </div>
));
export default TechnologiesChipList;
