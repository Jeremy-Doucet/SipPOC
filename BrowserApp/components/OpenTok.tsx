import React, { useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import styles from './OpenTok.module.css';

export function OpenTok({ apiKey, token, sessionId }) {
  let OT = null;
  useEffect(() => {
    OT = require('@opentok/client');
    console.log('Loaded opentok client!');
    console.log(`token: ${token} and sessionId: ${sessionId}`);
    initializeSession();
  }, []);

  const callMember = async () => {
    await fetch('/api/opentok/call', {
      method: 'POST',
      body: JSON.stringify({ sessionId: sessionId }),
    });
  };

  const handleError = (err) => {
    if (err) console.error(err);
  };

  const initializeSession = () => {
    const session = OT.initSession(apiKey, sessionId);

    session.on('streamCreated', (event) => {
      const opts: { insertMode: 'append'; width: string; height: string } = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
      };

      session.subscribe(event.stream, 'subscriber', opts, handleError);
    });

    // const publisherOpts: { insertMode: 'append'; width: string; height: string } = {
    //   insertMode: 'append',
    //   width: '100%',
    //   height: '100%',
    // };

    // const publisher = OT.initPublisher('publisher', publisherOpts, handleError);

    session.connect(token, (err) => {
      if (err) return handleError(err);

      // session.publish(publisher, handleError);
    });
  };

  return (
    <div>
      <Flex justifyContent={'center'}>
        <Button marginRight={'8'} onClick={callMember}>
          Call Member
        </Button>
        <Button>Join Call</Button>
      </Flex>
      <br />
      <Flex alignItems={'center'} flexDirection={'column'} height={'600px'}>
        <div id="publisher" className={styles.publisher}></div>
        <div id="subscriber" className={styles.subscriber}></div>
      </Flex>
    </div>
  );
}
