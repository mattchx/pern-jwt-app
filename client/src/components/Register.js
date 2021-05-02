import React, { Fragment, useState } from 'react';
import { Stack, Input, Container, Text, Button, Link } from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onInputChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/register',
        inputs
      );
      const { token } = response.data;

      // set Local Storage
      localStorage.setItem('token', token);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const { email, password, name } = inputs;
  return (
    <Fragment>
      <Container>
        <Text pl={4} fontSize="4xl" mt={7} mb={7}>
          Register
        </Text>
        <form onSubmit={submitForm}>
          <Stack spacing={5}>
            <Input
              onChange={e => onInputChange(e)}
              value={name}
              type="text"
              name="name"
              placeholder="Name"
            />
            <Input
              onChange={e => onInputChange(e)}
              value={email}
              type="email"
              name="email"
              placeholder="Email"
            />
            <Input
              onChange={e => onInputChange(e)}
              value={password}
              type="password"
              name="password"
              placeholder="Password"
            />
            <Button type="submit" colorScheme="purple" color="white">
              Submit
            </Button>
          </Stack>
        </form>
        <Link>
          <RouterLink to="/login">Login</RouterLink>
        </Link>
      </Container>
    </Fragment>
  );
};

export default Register;
