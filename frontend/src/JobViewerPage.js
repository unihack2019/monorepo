import React from 'react';
import { Typography, withStyles, Card, } from '@material-ui/core';
import TechnologiesChipList from './TechnologiesChipList';

const PlaceHolderAvatar = () => (
  <div>Rawr</div>
)

const CandidateItem = withStyles(
  theme => ({
    container: {
      display: 'flex',
    },
    avatar: {
      marginRight: theme.spacing.unit * 2
    },
  }), { withTheme: true })(({ classes, profile }) => (
  <Card className={classes.container}>
    <div className={classes.avatar}>
      <PlaceHolderAvatar url={profile.avatar_url}/>
    </div>
    <div>
      <Typography variant="h5" component="h1">{profile.name}</Typography>
      <Typography variant="p">{profile.bio}</Typography>
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
      avatar_url: 'https://avatars2.githubusercontent.com/u/5153619?s=460&v=4',
    }} />
    <CandidateItem profile={{
      name: 'Erfan Norozi',
      avatar_url: 'https://avatars2.githubusercontent.com/u/5153619?s=460&v=4',
    }} />
  </section>
));

const JobListing = ({ job }) => (
  <section>
    <Typography variant="h1">{job.title}</Typography>
    <Typography variant="h2">Preferred technologies</Typography>
    <TechnologiesChipList technologies={job.technologies}/>
    <Typography variant="body">{job.description}</Typography>
  </section>
);

const job = {
  title: 'RAWR',
  description: 'Description here aewrpoakwerpo awkrpoewak rpoawkerpewkr poawekrpo ewakr powekrp aewkr \n awpeoroaewpro kaewporwk \n\naopwekraperkaweoprk',
  technologies: [{
    name: 'typescript',
  }, {
    name: 'react',
  }],
};
const JobViewerPage = withStyles({
  page: {
    display: 'flex',
  },
  main: {
    flexBasis: '300px',
    flexGrow: 0,
    flexShrink: 0
  },
  aside: {
    flexBasis: '500px',
    flexGrow: 1,
    flexShrink: 1,
  }
})(({ classes }) => (//TODO: ({ job }) => (
  <section className={classes.page}>
    <main className={classes.main}>
      <JobListing job={job}/>
    </main>
    <aside className={classes.aside}>
      <CandidateList/>
    </aside>
  </section>
));
export default JobViewerPage;