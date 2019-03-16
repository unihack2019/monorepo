import React, { Component }  from 'react';
import { Avatar, Typography, Card, withStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import LabelIcon from '@material-ui/icons/Label';
import JobTechnology from './TechnologyChip';

const styles = {
  drawerPaper: {
    width: '300px',
  },
  nested: {
    paddingLeft: '32px',
  },
};

class CompanyDrawer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar alt="Remy Sharp" src="https://media.licdn.com/dms/image/C4E0BAQHtd7Urq4aI-Q/company-logo_200_200/0?e=2159024400&v=beta&t=d_u1vuL-XLYS_-loWcW7CtkwZ__S9XLHQ6dDHIqH96s" className={classes.avatar} />
            </ListItemIcon>
            <ListItemText primary="REA Group" />
          </ListItem>
        </List>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText inset primary="Job Listings" />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText inset primary="Bleh" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText inset primary="OMG this" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText inset primary="lalalal" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(CompanyDrawer);
