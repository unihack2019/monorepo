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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import scoreToMatch from './scoreToMatch';
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
    paddingRight: '20px',
  },
  secondCol: {
    flex: '1 1 auto',
    display: 'flex',
    flexFlow: 'column nowrap',
    maxWidth: '400px',
  },
  displayHeader: {
    display: 'flex',
    marginBottom: '10px',
  },
  techCard: {
    flex: '1 0 auto',
  },
  iconText: {
    '& > p': {
      marginLeft: '5px',
    },
    '& > a': {
      marginLeft: '5px',
    },
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.35em',
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
          <ProfileAvatar
            src={applicant.profile.avatar_url}
            match={scoreToMatch(store.technologyScore(store.technologiesRelevant(applicant, job)))}
          />
        </div>
        <div className={classes.secondCol}>
          <Typography component="h1" variant="h3" gutterBottom>
            {applicant.profile.name}
          </Typography>
          {applicant.profile.location ? (
            <div className={classes.iconText}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body1">{applicant.profile.location}</Typography>
            </div>
          ) : null}
          {applicant.profile.blog ? (
            <div className={classes.iconText}>
              <LinkIcon fontSize="small" />
              <Typography component="a" variant="body1" href={applicant.profile.blog} target="_blank">
                {applicant.profile.blog}
              </Typography>
            </div>
          ) : null}
          {applicant.profile.bio ? (
            <Typography variant="body1" gutterBottom>
              {applicant.profile.bio}
            </Typography>
          ) : null}
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
