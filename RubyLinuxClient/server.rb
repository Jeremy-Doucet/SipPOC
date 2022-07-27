require 'sinatra'
set :opentok_api_key, ENV['OPENTOK_API_KEY']

get '/' do
  "Hello World"
  settings.opentok_api_key
end

post '/start/:sessionId/:token' do
  @sessionId = params["sessionId"]
  @token = params["token"]

  publisher = Process.spawn('./linux-publisher/src/build/headless-video-publisher', [
      '-v', 'video.yuv', '-a', 'audio.pcm', `-k`, settings.opentok_api_key, `-s`, @sessionId, `-t`, @token
    ])
  Process.wait publisher

  puts `Starting session #{@sessionId} with token #{@token}`

  "success"
end
