import axios from 'axios';
import OpenTok, { Session } from 'opentok';

const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_API_SECRET);

export async function getServer() {
  return opentok;
}

export function getToken(sessionId): string {
  return opentok.generateToken(sessionId);
}

export async function callSipUri(sessionId: string) {
  const server = await getServer();
  const token = getToken(sessionId);
  const SIP_URI = process.env.SIP_URI;

  console.log('SIP_URI: ' + SIP_URI);
  console.log(`Calling SIP for session ${sessionId} and token ${token}`);

  return server.dial(
    sessionId,
    token,
    SIP_URI,
    { secure: true, from: '15551115555', video: true },
    (err, call) => {
      if (err) return console.log('error: ', err);

      console.log('SIP audio stream Id: ' + call.streamId + ' added to session ID: ' + sessionId);

      server.signal(sessionId, null, { type: 'newParticipant', data: '' }, (err) => {
        if (err) return console.log('error: ', err);
        console.log('SIP signal sent');
      });
    }
  );
}

export async function createSession(): Promise<Session> {
  const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_API_SECRET);

  return new Promise((resolve, _reject) => {
    opentok.createSession({ mediaMode: 'routed' }, (err, session) => {
      resolve(session);
    });
  });
}

export async function startVideoWaitingRoom(sessionId: string) {
  return axios.post(`http://localhost:3001/start/${sessionId}/${getToken(sessionId)}`);
}