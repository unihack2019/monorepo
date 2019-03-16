import React, {Component} from 'react';
import { Button } from '@material-ui/core';

export default class Home extends Component {
  render() {
    const clientId = "43fd6cb45d67a0b47ef4";
    const redirectUrl = "http://localhost:3000/github";
    const scope = "repo";
    return (
      <div>
        <Button href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}`}>Authorize Github</Button>
      </div>
    );
  }
}
