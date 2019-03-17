import React, { Component } from 'react';
import { Typography, Collapse, IconButton, withStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { decorate, observable } from 'mobx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import ProfileAvatar from './ProfileAvatar';
import TechCard from './TechCard';
import RepoCard from './RepoCard';
import store from './store';

const styles = {
  verticalContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  horizontalContainer: {
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
  firstCol: {
    flex: '0 1 150',
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingRight: '50px',
  },
  secondCol: {
    flex: '1 1 auto',
    display: 'flex',
    flexFlow: 'column nowrap',
    maxWidth: '400px',
  },
  displayHeader: {
    display: 'flex',
  },
  techCard: {
    flex: '1 0 auto',
  },
  expand: {
    margin: 'auto',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
};

class ProfileStore {
  showTech = false;
}
decorate(ProfileStore, {
  showTech: observable,
});
const profileStore = new ProfileStore();

const Profile = observer(({ match, classes }) => {
  const applicant = store.applicants[match.params.githubId];
  console.warn(applicant);
  const job = store.jobs[match.params.jobId];
  return (
    <div className={classnames(classes.container, classes.verticalContainer)}>
      <div className={classes.displayHeader}>
        <div className={classes.firstCol}>
          <ProfileAvatar match="verystrong" />
        </div>
        <div className={classes.secondCol}>
          <Typography component="h1" variant="h3" gutterBottom>
            John Applicant
          </Typography>
          <Typography component="p" variant="body1" gutterBottom>
            erfanio
          </Typography>
          <Typography component="p" variant="body1" gutterBottom>
            dev@erfan.io
          </Typography>
          <Typography component="p" variant="body1">
            I program... When I'm not programming I'm sleeping. When I'm not sleeping I'm programming. See how this
            works? :D
          </Typography>
        </div>
      </div>
      <div className={classes.verticalContainer}>
        <Typography component="h2" variant="h5" gutterBottom>
          Technologies
        </Typography>
        <div className={classes.horizontalContainer}>
          {store.technologiesRelevant(applicant, job).map((technology, i) => (
            <TechCard key={i} index={i} className={classes.techCard} technology={technology} applicant={applicant} />
          ))}
        </div>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: profileStore.showTech,
          })}
          onClick={() => (profileStore.showtech = !profileStore.showTech)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <div className={classes.verticalContainer}>
        <Typography component="h2" variant="h5" gutterBottom>
          Repos
        </Typography>
        <div className={classes.horizontalContainer}>
          {applicant.repositories
            .filter(repository => {
              for (const tech of repository.technologies) {
                for (const tech2 of job.technologies) {
                  if (tech.name === tech2.name) {
                    return true;
                  }
                }
              }
              return false;
            })
            .splice(0, 3)
            .map(repository => (
              <RepoCard className={classes.techCard} repository={repository} />
            ))}
        </div>
      </div>
    </div>
  );
});

export default withStyles(styles)(Profile);
