import React, { Fragment } from 'react';
import { Button, Text } from '@chakra-ui/react';
const Login = ({setAuth}) => {
  return (
    <Fragment>
      <Text fontSize="5xl">Login page</Text>
      <Button onClick={()=>setAuth(true)}>Authenticate</Button>
    </Fragment>
  );
};

export default Login;
