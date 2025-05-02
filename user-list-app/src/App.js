import React from 'react';
import { Box, Heading, Container } from '@chakra-ui/react';
import UserList from './pages/userList';

function App() {
  return (
    <Container maxW="90%" py={10}>
      <Heading mb={6} color="blue.500" textAlign="center" >User Management</Heading>
      <UserList />
    </Container>
  );
}

export default App;