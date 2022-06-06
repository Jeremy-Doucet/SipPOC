import { gql, useQuery } from '@apollo/client';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { OpenTok } from '../../components/OpenTok';
import { Session } from '../../types';

const GET_SESSION = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      id
      sessionId
      createdAt
      updatedAt
      description
      apiKey
      token
    }
  }
`;

export default function SessionShow() {
  const router = useRouter();
  const { id } = router.query;

  return id ? <Page id={id} /> : null;
}

function Page({ id }) {
  const { data }: { data: { session: Session } } = useQuery(GET_SESSION, { variables: { id } });
  return data && data.session ? (
    <div>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={1}>
          <OpenTok
            apiKey={data.session.apiKey}
            token={data.session.token}
            sessionId={data.session.sessionId}
          ></OpenTok>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex grow={1} direction={'column'}>
            <h1>Description: {data.session.description}</h1>
            <h2>Session: {data.session.sessionId}</h2>
          </Flex>
        </GridItem>
      </Grid>
    </div>
  ) : null;
}
