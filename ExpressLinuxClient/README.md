# Express Linux Client

This is the client used to serve the waiting room video for the SIP POC.

## How to Run

Install dependencies and setup the database
> `yarn install`
> `yarn sequelize-cli db:create`
> `yarn sequelize-cli db:migrate`

Run the docker container
> `docker build -t express-linux-client .`
> `docker run --init --rm -p 3001:3001 express-linux-client`