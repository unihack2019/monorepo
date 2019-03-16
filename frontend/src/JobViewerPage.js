import React from 'react';
import { Typography, withStyles, Card, Fade, Slide } from '@material-ui/core';
import TechnologiesChipList from './TechnologiesChipList';
import ProfileAvatar from './ProfileAvatar';
import matchToDisplayName from './matchToDisplayName';
import { Route } from 'react-router';
import { observer } from 'mobx-react';
import store from './store';

// Mmmm slow code :P
function match() {}

const TIMEOUT = 750;

class SlideFade extends React.Component {
  state = { in: false };
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ in: true });
    }, this.props.delay);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    return (
      <Slide direction="up" in={this.state.in} timeout={this.props.timeout}>
        <Fade in={this.state.in} timeout={this.props.timeout}>
          {this.props.children}
        </Fade>
      </Slide>
    );
  }
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
      marginRight: theme.spacing.unit * 2,
    },
  }),
  { withTheme: true },
)(({ classes, applicant }) => (
  <Route
    render={route => (
      <Card
        className={classes.container}
        onClick={() => route.history.push(`${route.match.url}/profiles/${route.match.params.jobId}`)}
      >
        <div className={classes.avatarContainer}>
          <ProfileAvatar size={64} match={'verystrong'} src={applicant.profile.avatar_url} />
          <Typography variant="subtitle2">{matchToDisplayName('verystrong')}</Typography>
        </div>
        <div>
          <Typography variant="h6" component="h1">
            {applicant.profile.name}
          </Typography>
          <Typography variant="body1">{applicant.profile.bio}</Typography>
          <TechnologiesChipList technologies={applicant.technologies} />
        </div>
      </Card>
    )}
  />
));

class Delayed extends React.Component {
  state = { children: null };
  componentDidMount() {
    this.setState({
      timeout: setTimeout(() => {
        this.setState({ timeout: null, children: this.props.children });
      }, this.props.delay),
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (state.timeout) {
      return { children: null, timeout: state.timeout };
    }
    return {
      timeout: null,
      children: props.children,
    };
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    return this.state.children;
  }
}

const CandidateList = withStyles(
  theme => ({
    list: {
      '&>*:not(:last-child)': {
        marginBottom: theme.spacing.unit * 2,
      },
    },
  }),
  { withTheme: true },
)(
  observer(({ classes }) => (
    <section className={classes.list}>
      {Object.keys(store.applicants)
        .map(key => [key, store.applicants[key]])
        .map(([key, applicant], index) => (
          <CandidateItem key={key} applicant={applicant} y />
        ))}
    </section>
  )),
);

const Subheading = props => <Typography variant="h5" gutterBottom {...props} />;

const JobListing = withStyles(
  theme => ({
    title: {},
    chipList: {
      marginBottom: theme.spacing.unit * 2,
    },
  }),
  { withTheme: true },
)(({ job, classes }) => (
  <section>
    <div>
      <Subheading>Preferred technologies</Subheading>
      <div className={classes.chipList}>
        <TechnologiesChipList technologies={job.technologies} />
      </div>
    </div>
    <div>
      <Subheading>Description</Subheading>
      <Typography variant="body1" gutterBottom>
        {job.description}
      </Typography>
    </div>
  </section>
));

const job = {
  title: 'Job title',
  description:
    'Description here aewrpoakwerpo awkrpoewak rpoawkerpewkr poawekrpo ewakr powekrp aewkr \n awpeoroaewpro kaewporwk \n\naopwekraperkaweoprk',
  technologies: [
    {
      name: 'typescript',
    },
    {
      name: 'react',
    },
    {
      name: 'express',
    },
    {
      name: 'TensorFlow',
    },
    {
      name: 'Go',
    },
    {
      name: 'Java',
    },
    {
      name: 'JavaScript',
    },
  ],
};

const JobViewerPageStyled = withStyles(theme => {
  const pagePaddingUnit = theme.spacing.unit * 6;
  return {
    page: {
      padding: pagePaddingUnit,
      minHeight: '100%',
      boxSizing: 'border-box',
    },
    content: {
      display: 'flex',
    },
    main: {
      flexBasis: theme.spacing.unit * 65,
      flexGrow: 0,
      flexShrink: 0,
      overflow: 'auto',
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
      overflow: 'visible',
    },
  };
})((
  { classes }, //TODO: ({ job }) => (
) => (
  <section className={classes.page}>
    <Typography variant="h3" className={classes.title} gutterBottom>
      {job.title}
    </Typography>
    <div className={classes.content}>
      <main className={classes.main}>
        <JobListing job={job} />
      </main>
      <div className={classes.gap} />
      <aside className={classes.aside}>
        <Subheading>Description</Subheading>
        <CandidateList />
      </aside>
    </div>
  </section>
));
export default JobViewerPageStyled;
