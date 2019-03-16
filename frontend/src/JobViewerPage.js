import React from 'react';
import { Typography, withStyles, Card, Fade, Slide } from '@material-ui/core';
import TechnologiesChipList from './TechnologiesChipList';
import ProfileAvatar from './ProfileAvatar';
import matchToDisplayName from './matchToDisplayName';
import { Route } from 'react-router';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import store from './store';

// Mmmm slow code :P
function match() {}

function matchColor(match) {
  switch (match) {
    case 'poor':
      return '#F44336';
    case 'moderate':
      return '#FFC107';
    case 'strong':
      return '#8bc34a';
    case 'verystrong':
      return '#4CAF50';
  }
}

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
    match: {
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '14px',
      paddingTop: '8px',
    }
  }),
  { withTheme: true },
)(({ classes, applicant, job }) => {
  const relevant = store.technologiesRelevant(applicant, job);
  toJS(relevant).forEach(console.log);
  console.log('RAWR ' + applicant.profile.name, store.technologyScore(relevant));
  const match = 'strong';
  return (
    <Route
      render={route => (
        <Card
          className={classes.container}
          onClick={() => route.history.push(`${route.match.url}/profiles/${route.match.params.jobId}`)}
        >
          <div className={classes.avatarContainer}>
            <ProfileAvatar size={64} match={match} src={applicant.profile.avatar_url} />
            <Typography variant="subtitle2" style={{color: matchColor(match)}} className={classes.match}>
              {matchToDisplayName(match)}
            </Typography>
          </div>
          <div>
            <Typography variant="h6" component="h1">
              {applicant.profile.name}
            </Typography>
            <Typography variant="body1">{applicant.profile.bio}</Typography>
            <TechnologiesChipList technologies={relevant} />
          </div>
        </Card>
      )}
    />
  );
});

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
  observer(({ classes, job }) => (
    <section className={classes.list}>
      {Object.keys(store.applicants)
        .map(key => [key, store.applicants[key]])
        .map(([key, applicant], index) => (
          <CandidateItem key={key} job={job} applicant={applicant} y />
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
        <span dangerouslySetInnerHTML={{ __html: job.description }} />
      </Typography>
    </div>
  </section>
));

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
})(
  observer((
    { classes, match }, //TODO: ({ job }) => (
  ) => {
    const job = store.jobs[match.params.jobId];
    return job ? (
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
            <CandidateList job={job} />
          </aside>
        </div>
      </section>
    ) : null;
  }),
);
export default JobViewerPageStyled;
