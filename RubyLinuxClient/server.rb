require 'sinatra'

get '/' do
  "Hello World"
end

post '/start/:sessionId/:token' do
  @sessionId = params["sessionId"]
  @token = params[token]

  publisher = Process.spawn('./linux-publisher/src/build/headless-video-publisher', [
      '-v', 'video.yuv', '-a', 'audio.pcm', `-k`, process.env.OPENTOK_API_KEY, `-s`, @sessionId, `-t`, @token
    ])
  Process.wait publisher

  puts `Starting session #{@sessionId} with token #{@token}`

  "success"
end
