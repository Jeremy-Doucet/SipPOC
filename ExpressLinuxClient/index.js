const express = require('express')
require('dotenv').config()
const { spawn } = require('node:child_process')

const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/start/:sessionId/:token', async (req, res) => {
  const { sessionId, token, ref_cd } = req.params

  console.log(`Starting session ${sessionId} with token ${token}`)

  // Both a video file and an audio file are required for the headless publisher. If we are looking to have no audio, we should create
  // an "empty" audio file, like I did here.
  const publisher = spawn('./linux-publisher/src/build/headless-video-publisher', ['-v', 'video.yuv', '-a', 'audio.pcm', `-k`, process.env.OPENTOK_API_KEY, `-s`, sessionId, `-t`, token])

  publisher.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  publisher.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  res.send('Hello World!')
})

app.post('/tokbox', async (req, res) => {
  console.log(JSON.stringify(req.body))
  console.log(req.body)
  res.send()
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
  console.log('Deleting all currently open sessions')
  process.exit();
});