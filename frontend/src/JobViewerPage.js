import React from 'react';
import { Typography, withStyles, Card, Fade, Slide } from '@material-ui/core';
import TechnologiesChipList from './TechnologiesChipList';
import ProfileAvatar from './ProfileAvatar';
import matchToDisplayName from './matchToDisplayName';
import { Route } from 'react-router';

// Mmmm slow code :P
function match() {
  
}

const CandidateItem = withStyles(
  theme => ({
    container: {
      display: 'flex',
      padding: theme.spacing.unit * 2,
    },
    avatar: {
      backgroundColor: '#FFFs',
    },
    avatarContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginRight: theme.spacing.unit * 2
    },
  }), { withTheme: true })(({ classes, profile }) => (
  <Route 
    render={(route) => (
      <Card className={classes.container} onClick={() => route.history.push(`${route.match.path}/profiles/${route.match.params.jobId}`)}>
        <div className={classes.avatarContainer}>
          <ProfileAvatar size={64} match={profile.match}/>
          <Typography variant="subtitle2">{matchToDisplayName(profile.match)}</Typography>
        </div>
        <div>
          <Typography variant="h6" component="h1">{profile.name}</Typography>
          <TechnologiesChipList technologies={profile.technologies.slice(0, 3)}/>
          <Typography variant="body1">{profile.bio}</Typography>
        </div>
      </Card>
    )}
  />
));

const CandidateList = withStyles(theme => ({
  list: {
    '&>*:not(:last-child)': {
      marginBottom: theme.spacing.unit * 2,
    }
  }
}), { withTheme: true })(({ classes }) => (
  <section className={classes.list}>
    {[
      {
        name: 'Erfan Norozi',
        match: 'verystrong',
        technologies: [{ name: 'javascript' }, { name: 'go'}, { name: 'express'}],
        bio: 'Big potato face person with good coding skills. Yas, hire this person pl0x.\nThis\nshould\ndefinately cut off at some point in the next couple of lines\ncause this is getting really long',
        avatar_url: 'https://avatars2.githubusercontent.com/u/5153619?s=460&v=4',
      },
      {
        name: 'Patrick Shaw',
        match: 'strong',
        bio: 'Ah mah gahd sah g0000000000000000000000000000000000000000d. Pls hire meh.\n Soemthing something yadad rawr potatos carrots stuff.\n Something something something\n Rawr rawr\n AWesome awesome',
        technologies: [{name: 'typescript'}, {name:'javascript'}, { name: 'java'}],
        avatar_url: 'https://avatars2.githubusercontent.com/u/5153619?s=460&v=4',
      }
    ].map((profile, index) => (
      <Slide direction="up" in timeout={(index + 1) * 300}>
        <CandidateItem profile={profile}/>
      </Slide>
    ))}
  </section>
));

const Subheading = (props) => (
  <Typography variant="h5" gutterBottom {...props} />
);

const JobListing = withStyles(theme => ({
  title: {
  },
  chipList: {
    marginBottom: theme.spacing.unit * 2,
  }
}), { withTheme: true })(({ job, classes }) => (
  <section>
    <Subheading>Preferred technologies</Subheading>
    <div className={classes.chipList}>
      <TechnologiesChipList technologies={job.technologies}/>
    </div>
    <Subheading>Description</Subheading>
    <Typography variant="body1" gutterBottom>{job.description}</Typography>
  </section>
));

const job = {
  title: 'Job title',
  description: 'Description here aewrpoakwerpo awkrpoewak rpoawkerpewkr poawekrpo ewakr powekrp aewkr \n awpeoroaewpro kaewporwk \n\naopwekraperkaweoprk',
  technologies: [{
    name: 'typescript',
  }, {
    name: 'react',
  }, {
    name: 'express'
  }, {
    name: 'TensorFlow'
  }, {
    name: 'Go'
  }, {
    name: 'Java'
  }, {
    name: 'JavaScript'
  }],
};
const JobViewerPage = withStyles(theme => {
  const pagePaddingUnit = theme.spacing.unit * 6;
  return {
    page: {
      padding: pagePaddingUnit,
    },
    content: {
      display: 'flex',
    },
    main: {
      flexBasis: theme.spacing.unit * 65,
      flexGrow: 0,
      flexShrink: 0,
    },
    gap: {
      flexBasis: pagePaddingUnit,
      flexGrow: 0,
      flexShrink: 0,
    },
    aside: {
      flexBasis: '500px',
      flexGrow: 1,
      flexShrink: 1,
    }
  }
})(({ classes }) => (//TODO: ({ job }) => (
  <section className={classes.page}>
    <Typography variant="h3" className={classes.title} gutterBottom>{job.title}</Typography>
      <div className={classes.content}>
      <main className={classes.main}>
        <JobListing job={job}/>
      </main>
      <div className={classes.gap}/>
      <aside className={classes.aside}>
        <Subheading>Description</Subheading>
        <CandidateList/>
      </aside>
    </div>
  </section>
));
export default JobViewerPage;