import React, { Fragment } from 'react';
import { Button, Text } from '@chakra-ui/react';

const Dashboard = ({ setAuth }) => {
  return (
    <Fragment>
      <Text fontSize="5xl">Dashboard page</Text>
      <Button onClick={() => setAuth(false)}>Log out</Button>
    </Fragment>
  );
};

export default Dashboard;
