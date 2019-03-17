import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = {
  hero: {
    height: '400px',
    background: 'linear-gradient(rgba(0, 119, 181, 0.3), rgba(0, 119, 181, 0.3)), url(stock-image.jpg)',
    backgroundSize: 'cover',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  heroText: {
    flex: '1 1 auto',
    textAlign: 'center',
  },
  logo: {
    width: '250px',
    height: 'auto',
  },
  h: {
    color: '#fff',
    fontWeight: 700,
  },
  container: {
    maxWidth: '700px',
    margin: 'auto',
    padding: '20px',
  },
};

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.hero}>
          <div class={classes.heroText}>
            <img src="/logo.png" className={classes.logo} />
            <Typography component="h2" variant="h6" gutterBottom className={classes.h}>
              The smart way to vet technical candidates
            </Typography>
          </div>
        </div>
      <div className={classes.container}>
          <Typography component="h2" variant="h6">Inspiration</Typography>
          <Typography component="p" variant="body1" gutterButton>
Recruiters can often have a hard time assessing the technical capabilities of applicants for software development roles. While they may know the names of the skills and technologies needed by the business, it usually isn't until a coding test or on-site interview with another developer that an applicant's technical ability can be determined. In fact, a 2017 report by Glassdoor showed that the average amount of time to fill a position was 23.7 days, with 80% of employers saying that one of their main difficulties when hiring for a role was that they received too many underqualified résumés.

We want to save recruiters time when hiring by taking the guesswork and tedious résumé skimming out of the initial hiring process.
        </Typography>
          <Typography component="h2" variant="h6">
What it does
        </Typography>


          <Typography component="p" variant="body1" gutterBottom>
Hire Me is a service that fits in to existing job application processes to provide recruiters with more objective and useful metrics of technical ability.

When a candidate completes a job application with a participating recruiter, they are directed to sign into their GitHub account to complete a scan across all of their code repositories. Our scan identifies all of the languages and technologies the applicant has used, along with information about how much experience they have with them. Results from these scans are then made available to the recruiter through a dashboard, showing a ranked list of applicants depending on how proficient they are with the relevant technologies for the role. This provides recruiters with an easy and more objective way of comparing applicants, helping them make better decisions and avoid bias.

We also hope that Hire Me will save companies resources when hiring, by helping recruiters to reduce their total pool of applicants to interview.
        </Typography>
          <Typography component="h2" variant="h6">
How we built it
        </Typography>

          <Typography component="p" variant="body1" gutterBottom>
Hire Me is built with the React, Firebase and Node.js Express frameworks, with a heavy focus on Github API interactions. We also used Python to populate job listings from real-world data to save recruiters from manually copying listing information from other sites.

We split our work by having half of our team craft the frontend UI and backend server logic, with the other half concentrating on fetching the listing data, practicing our pitch, and helping out others.
        </Typography>
      </div>
      </>
    );
  }
}

export default withStyles(styles)(Home);
