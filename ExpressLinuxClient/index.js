const express = require('express')
require('dotenv').config()
const { OpenSession } = require('./models')
const { spawn } = require('node:child_process')

const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/start/:sessionId/:token', async (req, res) => {
  const { sessionId, token } = req.params

  console.log(`Starting session ${sessionId} with token ${token}`)

  const publisher = spawn('./linux-publisher/src/build/headless-video-publisher', ['-v', 'video.yuv', '-a', 'audio.pcm', `-k`, process.env.OPENTOK_API_KEY, `-s`,  sessionId, `-t`, token])
  
  publisher.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  publisher.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  

  await OpenSession.create({
    sessionId,
    token,
    pid: publisher.pid
  })

  res.send('Hello World!')
})

app.post('/stop/:session/:token', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

process.on('SIGINT', function() {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
  console.log('Deleting all currently open sessions')
  OpenSession.destroy({ where: {}, truncate: true })
  process.exit();
});