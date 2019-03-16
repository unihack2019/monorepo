import React, { Component } from 'react';
import { Typography, Collapse, Button, IconButton, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import ProfileAvatar from './ProfileAvatar';
import TechCard from './TechCard';
import icon from './icon.js';

const styles = {
  container: {
    padding: '20px',
  },
  verticalContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  horizontalContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
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
  },
  techCard: {
    flex: '1 0 auto',
    margin: '5px',
    marginRight: '20px',
    marginBottom: '20px',
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
}

class Profile extends Component {
  state = { showTech: false }

  render() {
    const { classes } = this.props;
    const { showTech } = this.state;

    return (
      <div className={classnames(classes.container, classes.verticalContainer)}>
        <div className={classes.horizontalContainer}>
          <div className={classes.firstCol}>
            <ProfileAvatar match="verystrong"/>
          </div>
          <div className={classes.secondCol}>
            <Typography component="h1" variant="h3" gutterBottom>
              John Applicant
            </Typography>
            <Typography component="p" variant="h5" gutterBottom>
              erfanio
            </Typography>
          </div>
        </div>
        <div className={classes.verticalContainer}>
          <Typography component="h2" variant="h5" gutterBottom>
            Technologies
          </Typography>
          <Collapse collapsedHeight="140px" in={showTech}>
            <div className={classes.horizontalContainer}>
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
            </div>
            <div className={classes.horizontalContainer}>
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
              <TechCard
                className={classes.techCard}
                name="Java"
                icon={icon('java')}
              />
            </div>
          </Collapse>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: showTech,
            })}
            onClick={() => this.setState({ showTech: !showTech })}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
