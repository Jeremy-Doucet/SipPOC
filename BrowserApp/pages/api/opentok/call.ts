import { callSipUri, startVideoWaitingRoom } from '../../../lib/opentokService';

export default async function handler(req, res) {
  const sessionId = JSON.parse(req.body).sessionId;

  if (!sessionId) {
    res.status(400).json({ error: 'No Session ID' });

    return;
  }

  await startVideoWaitingRoom(sessionId);
  await callSipUri(sessionId);

  res.status(200).json({ foo: 'bar' });
}
