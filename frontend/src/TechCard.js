import React from 'react';
import { Avatar, Card, CardHeader, CardContent } from '@material-ui/core';

export default ({ className, icon }) => (
  <Card className={className}>
    <CardHeader title="Java" avatar={<Avatar src={icon}></Avatar>} />
    <CardContent>
      100LOC
    </CardContent>
  </Card>
);
