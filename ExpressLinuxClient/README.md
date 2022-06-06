# Express Linux Client

This is the client used to serve the waiting room video for the SIP POC.

## How to Run

Run the docker container
> `docker build -t express-linux-client .`
> `docker run --init --rm -p 3001:3001 express-linux-client`

## Notes

This app uses the headless linux publisher found here: https://github.com/nexmo-se/headless-video-publisher-linux