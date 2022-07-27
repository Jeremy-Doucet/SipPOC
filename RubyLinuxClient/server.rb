require 'sinatra/base'

raise "You must define API_KEY environment variables" unless ENV.has_key?("OPENTOK_API_KEY")

class Application < Sinatra::Base
  set :api_key, ENV['OPENTOK_API_KEY']

  get '/' do
    "Hello World"
  end

  get '/apikey' do
    api_key = settings.api_key

    "api key #{api_key}"
  end

  post '/start/:sessionId/:token' do
    @sessionId = params["sessionId"]
    @token = params["token"]

    puts `Starting session #{@sessionId} with token #{@token}`

    publisher = spawn('./linux-publisher/src/build/headless-video-publisher', [
        '-v', 'video.yuv', '-a', 'audio.pcm', `-k`, settings.api_key, `-s`, @sessionId, `-t`, @token
      ])
    Process.wait publisher

    "success"
  end


end