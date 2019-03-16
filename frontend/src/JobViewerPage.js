import React from 'react';
import { Typography, withStyles, Card, } from '@material-ui/core';
import TechnologiesChipList from './TechnologiesChipList';
import ProfileAvatar from './ProfileAvatar';
import matchToDisplayName from './matchToDisplayName';

const CandidateItem = withStyles(
  theme => ({
    container: {
      display: 'flex',
      padding: theme.spacing.unit * 2,
    },
    avatar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginRight: theme.spacing.unit * 2
    },
  }), { withTheme: true })(({ classes, profile }) => (
  <Card className={classes.container}>
    <div className={classes.avatar}>
      <ProfileAvatar size={60} match={profile.match}/>
      <Typography variant="body2">{matchToDisplayName(profile.match)}</Typography>
    </div>
    <div>
      <Typography variant="h5" component="h1">{profile.name}</Typography>
      <Typography variant="body1">{profile.bio}</Typography>
    </div>
  </Card>
));

const CandidateList = withStyles(theme => ({
  list: {
    '&>*:not(:last-child)': {
      marginBottom: theme.spacing.unit * 2,
    }
  }
}), { withTheme: true })(({ classes }) => (
  <section className={classes.list}>
    <CandidateItem profile={{
      name: 'Patrick Shaw',
      match: 'strong',
      avatar_url: 'https://avatars2.githubusercontent.com/u/5153619?s=460&v=4',
    }} />
    <CandidateItem profile={{
      name: 'Erfan Norozi',
      match: 'verystrong',
      avatar_url: 'https://avatars2.githubusercontent.com/u/5153619?s=460&v=4',
    }} />
  </section>
));

const JobListing = ({ job }) => (
  <section>
    <Typography variant="h3">{job.title}</Typography>
    <Typography variant="h4">Preferred technologies</Typography>
    <TechnologiesChipList technologies={job.technologies}/>
    <Typography variant="body">{job.description}</Typography>
  </section>
);

const job = {
  title: 'Job title',
  description: 'Description here aewrpoakwerpo awkrpoewak rpoawkerpewkr poawekrpo ewakr powekrp aewkr \n awpeoroaewpro kaewporwk \n\naopwekraperkaweoprk',
  technologies: [{
    name: 'typescript',
  }, {
    name: 'react',
  }],
};
const JobViewerPage = withStyles(theme => ({
  page: {
    display: 'flex',
  },
  main: {
    padding: theme.spacing.unit * 2,
    flexBasis: theme.spacing.unit * 60,
    flexGrow: 0,
    flexShrink: 0,
  },
  gap: {
    flexBasis: theme.spacing.unit * 2,
    flexGrow: 0,
    flexShrink: 0,
  },
  aside: {
    padding: theme.spacing.unit * 2,
    flexBasis: '500px',
    flexGrow: 1,
    flexShrink: 1,
  }
}))(({ classes }) => (//TODO: ({ job }) => (
  <section className={classes.page}>
    <main className={classes.main}>
      <JobListing job={job}/>
    </main>
    <div className={classes.gap}/>
    <aside className={classes.aside}>
      <CandidateList/>
    </aside>
  </section>
));
export default JobViewerPage;