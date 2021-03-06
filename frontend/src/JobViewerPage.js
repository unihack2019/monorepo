import React from 'react';
import { Typography, withStyles, Card, Fade, Slide } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import TechnologiesChipList from './TechnologiesChipList';
import ProfileAvatar from './ProfileAvatar';
import matchToDisplayName from './matchToDisplayName';
import { Route, Switch } from 'react-router';
import { observer } from 'mobx-react';
import store from './store';
import joinUrl from './joinUrl';
import Profile from './Profile';
import scoreToMatch from './scoreToMatch';
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
      cursor: 'pointer',
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
    chipList: {
      marginTop: '10px',
    },
  }),
  { withTheme: true },
)(({ classes, applicant, applicantId, match, relevant }) => {
  return (
    <Route
      render={route => (
        <Card
          className={classes.container}
          onClick={() => {
            console.log(`/jobs/${route.match.params.jobId}/profiles/${applicantId}`);
            route.history.push(`/jobs/${route.match.params.jobId}/profiles/${applicantId}`);
          }}
        >
          <div className={classes.avatarContainer}>
            <ProfileAvatar size={64} match={match} src={applicant.profile.avatar_url} />
            <Typography variant="subtitle2" style={{ color: matchColor(match) }} className={classes.match}>
              {matchToDisplayName(match)}
            </Typography>
          </div>
          <div>
            <Typography variant="h6" component="h1" gutterBottom>
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
            <TechnologiesChipList technologies={relevant} className={classes.chipList} />
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
  observer(({ classes, job }) => {
    return (
      <section className={classes.list}>
        {Object.keys(store.applicants)
          .map(key => [key, store.applicants[key]])
          .map(([key, applicant], index) => {
            const relevant = store.technologiesRelevant(applicant, job);
            const score = store.technologyScore(relevant);
            const match = scoreToMatch(score);
            return { key, applicant, relevant, score, match };
          })
          .sort((a, b) => (a.score > b.score ? -1 : a.score < b.score ? 1 : 0))
          .map(({ key, applicant, relevant, score, match }) => (
            <CandidateItem
              key={key}
              relevant={relevant}
              score={score}
              match={match}
              applicant={applicant}
              applicantId={key}
            />
          ))}
      </section>
    );
  }),
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

class BestCode extends React.Component {
  componentDidMount() {
    // BEST CODE
    window.scrollTo(0, 0);
  }
  render() {
    return null;
  }
}

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
        <BestCode />
        <div className={classes.content}>
          <main className={classes.main}>
            <Typography variant="h3" className={classes.title} gutterBottom>
              {job.title}
            </Typography>
            <JobListing job={job} />
          </main>
          <div className={classes.gap} />
          <aside className={classes.aside}>
            <Switch>
              <Route path={'/jobs/:jobId/profiles/:githubId'} exact component={Profile} />
              <Route
                render={() => (
                  <>
                    <Subheading>Description</Subheading>
                    <CandidateList job={job} />
                  </>
                )}
              />
            </Switch>
          </aside>
        </div>
      </section>
    ) : null;
  }),
);
export default JobViewerPageStyled;
