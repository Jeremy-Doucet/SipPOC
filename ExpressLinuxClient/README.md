# Express Linux Client

This is the client used to serve the waiting room video for the SIP POC.

## How to Run

1. Create a `.env` file, and fill it in with values from the `.env.example` file.
2. `yarn buildDocker`
3. `yarn runDocker`

## Notes

This app uses the headless linux publisher found here: https://github.com/nexmo-se/headless-video-publisher-linux