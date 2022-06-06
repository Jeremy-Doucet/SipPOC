import React from 'react';
import Head from 'next/head';
import { Heading, Center, Button, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';

import { CreateSessionForm } from '../components/CreateSessionForm';

const GET_SESSIONS = gql`
  query ALL_SESSIONS {
    sessions {
      id
      sessionId
      createdAt
      updatedAt
      description
    }
  }
`;

const CREATE_SESSION = gql`
  mutation CREATE_SESSION($description: String) {
    createSession(description: $description) {
      id
      sessionId
      createdAt
      updatedAt
      description
    }
  }
`;

const DELETE_SESSION = gql`
  mutation DELETE_SESSION($id: ID!) {
    deleteSession(id: $id) {
      id
      sessionId
      createdAt
      updatedAt
      description
    }
  }
`;

function Home() {
  const [createSessionGql] = useMutation(CREATE_SESSION);
  const [deleteSessionGql] = useMutation(DELETE_SESSION);
  const { data, loading, refetch } = useQuery(GET_SESSIONS);

  const createSession = async (input) => {
    return createSessionGql(input)
      .then(() => refetch())
      .catch((err) => console.error(err));
  };

  const deleteSession = (sessionId) => {
    deleteSessionGql({ variables: { id: sessionId } })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
      </Head>

      <Center flexDirection={'column'} height={'100%'}>
        <Heading size="lg">I am home page!</Heading>
        <br />
        <CreateSessionForm callback={createSession}></CreateSessionForm>

        <Table>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Session Id</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!loading &&
              data?.sessions &&
              data.sessions.map((session) => (
                <Tr key={session.id}>
                  <Td>{session.description}</Td>
                  <Td>{session.sessionId}</Td>
                  <Td>
                    <Link href={`/session/${session.id}`} passHref>
                      <Button>Open</Button>
                    </Link>
                    <Button colorScheme={'red'} onClick={() => deleteSession(session.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Center>
    </>
  );
}

export default Home;
