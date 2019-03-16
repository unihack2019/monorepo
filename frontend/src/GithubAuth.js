import React from 'react';
import { Button } from '@material-ui/core';

export default () => {
  // const clientId = '43fd6cb45d67a0b47ef4';
  const redirectUrl = `${process.env.REACT_APP_FRONTEND_URL}/github`;
  const scope = 'repo';
  return (
    <div>
      <Button
        href={`https://github.com/login/oauth/authorize?client_id=${
          process.env.REACT_APP_CLIENT_ID
        }&redirect_uri=${redirectUrl}&scope=${scope}`}
      >
        Authorize Github
      </Button>
    </div>
  );
}
