FROM node:16

# Setting up OpenTok Linux SDK
# https://github.com/nexmo-se/headless-video-publisher-linux
RUN curl -s https://packagecloud.io/install/repositories/tokbox/debian/script.deb.sh | bash
RUN apt install -y libopentok-dev
RUN apt install -y build-essential cmake clang libc++-dev libc++abi-dev \
    pkg-config libasound2 libpulse-dev libsdl2-dev

WORKDIR /app
COPY . .

WORKDIR /app/linux-publisher
RUN mkdir src/build
WORKDIR /app/linux-publisher/src/build
RUN CC=clang CXX=clang++ cmake ..
RUN make

WORKDIR /app
RUN yarn install
ENV NODE_ENV=docker
CMD ["node", "index.js"]
EXPOSE 3001