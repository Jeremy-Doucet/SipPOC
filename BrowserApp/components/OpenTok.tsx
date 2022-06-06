import React, { useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import styles from './OpenTok.module.css';

export function OpenTok({ apiKey, token, sessionId }) {
  const [waitingRoomConnection, setWaitingRoomConnection] = React.useState(null);
  const [session, setSession] = React.useState(null);
  const [OT, setOT] = React.useState(null);

  useEffect(() => {
    /* eslint @typescript-eslint/no-var-requires: "off" */
    setOT(require('@opentok/client'));
    console.log('Loaded opentok client!');
    console.log(`token: ${token} and sessionId: ${sessionId}`);
  }, []);

  useEffect(() => {
    if (!OT) return;
    setSession(OT.initSession(apiKey, sessionId));
  }, [OT]);

  useEffect(() => {
    if (!session) return;

    session.on('streamCreated', (event) => {
      const opts: { insertMode: 'append'; width: string; height: string } = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
      };

      session.subscribe(event.stream, 'subscriber', opts, handleError);
    });

    session.on('connectionCreated', (event) => {
      console.log(`Connection created`);
      console.log(event.connection);

      if (event.connection.data === 'name=waiting_room') {
        console.log('found waiting room');
        setWaitingRoomConnection(event.connection);
      }
    });

    session.connect(token, (err) => {
      if (err) return handleError(err);
      // session.publish(publisher, handleError);
    });
  }, [session]);

  const callMember = async () => {
    await fetch('/api/opentok/call', {
      method: 'POST',
      body: JSON.stringify({ sessionId: sessionId }),
    });
  };

  const handleError = (err) => {
    if (err) console.error(err);
  };

  const joinCall = () => {
    console.log('JOINING THE CALL');
    console.log(OT);

    const publisherOpts: { insertMode: 'append'; width: string; height: string } = {
      insertMode: 'append',
      width: '100%',
      height: '100%',
    };

    const publisher = OT.initPublisher('publisher', publisherOpts, handleError);
    session.publish(publisher, handleError);
    session.forceDisconnect(waitingRoomConnection);
    setWaitingRoomConnection(null);
  };

  return (
    <div>
      <Flex justifyContent={'center'}>
        <Button marginRight={'8'} onClick={callMember}>
          Call Member
        </Button>
        <Button onClick={joinCall}>Join Call</Button>
      </Flex>
      <br />
      <Flex alignItems={'center'} flexDirection={'column'} height={'600px'}>
        <div id="publisher" className={styles.publisher}></div>
        <div id="subscriber" className={styles.subscriber}></div>
      </Flex>
    </div>
  );
}
