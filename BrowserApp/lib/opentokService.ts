import axios from 'axios';
import OpenTok, { Role, Session } from 'opentok';

import { getAccessToken } from './alexa';

const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_API_SECRET);

export async function getServer() {
  return opentok;
}

export function getToken(sessionId, role: Role = 'publisher', name = ''): string {
  return opentok.generateToken(sessionId, { role: role, data: `name=${name}` });
}

export async function callSipUri(sessionId: string) {
  const server = await getServer();
  const token = getToken(sessionId, 'publisher', 'device');

  const { sipUri, headers } = await buildSipInfo();

  console.log('SIP_URI: ' + sipUri);
  console.log(`Calling SIP for session ${sessionId} and token ${token}`);
  console.log('Headers: ' + JSON.stringify(headers));

  return server.dial(
    sessionId,
    token,
    sipUri,
    {
      secure: true,
      from: 'fake@sip.opentok.com',
      video: true,
      headers: headers,
    },
    (err, call) => {
      if (err) return console.log('Error calling the SIP Uri: ', err);

      console.log('SIP stream Id: ' + call.streamId + ' added to session ID: ' + sessionId);
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
  return axios
    .post(
      `${process.env.EXPRESS_SERVER_HOST}/start/${sessionId}/${getToken(
        sessionId,
        'publisher',
        'waiting_room'
      )}`
    )
    .then(() => console.log('Successfully started the waiting room'))
    .catch((e) => {
      console.error('THERE WAS AN ERROR STARTING THE WAITING ROOM');
      console.error(e);
    });
}

/**
 *  If the `AMAZON_REFRESH_TOKEN` env variable exists:
 *    - Refresh the current access token
 *    - Return the SIP URI and headers needed by Amazon for the SIP call
 *
 *  note: For the current flow, you must call the callcenter first on the device so it can be initialized
 *  in Amazon's systems before we can call it.
 *
 *  Otherwise:
 *    - Return empty headers and the SIP URI
 */
async function buildSipInfo() {
  if (process.env.AMAZON_REFRESH_TOKEN) {
    return buildSipInfoForAlexaDevice();
  } else return buildSipInfoForSipClient();
}

async function buildSipInfoForAlexaDevice() {
  const accessToken = await getAccessToken(process.env.AMAZON_REFRESH_TOKEN);
  return {
    sipUri: `sip:${process.env.SIP_URI};transport=tls`,
    headers: {
      'X-Authorization': encodeURI(accessToken),
    },
  };
}

function buildSipInfoForSipClient() {
  return {
    sipUri: `sip:${process.env.SIP_URI}`,
    headers: {},
  };
}
