# Express Linux Client

This is the client used to serve the waiting room video for the SIP POC.

## How to Run

1. Create a `.env` file, and fill it in with values from the `.env.example` file.
2. `yarn buildDocker`
3. `yarn runDocker`

## Notes

This app uses the headless linux publisher found here: https://github.com/nexmo-se/headless-video-publisher-linux

## Audio and Video Files

You will need ffmpeg installed
> brew install ffmpeg

Download an image you want to use (i chose https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg)
> curl -o dog.jpg https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg

Convert the image to a video
>  ffmpeg -loop 1 -i dog.jpg -f lavfi -i anullsrc=channel_layout=5.1:sample_rate=48000 -t 15 -c:v libx264 -t 15 -pix_fmt yuv420p -vf scale=1280:720 -y output.mp4

Convert to 30fps
> ffmpeg -i output.mp4 -filter:v fps=30 output30fps.mp4

Generate yuv video file
> ffmpeg -i output30fps.mp4 -c:v rawvideo -pixel_format yuv420p  video.yuv

Generate pcm audio file
> ffmpeg -y  -i output30fps.mp4 -acodec pcm_s16le -f s16le -ac 1 -ar 16000 audio.pcm