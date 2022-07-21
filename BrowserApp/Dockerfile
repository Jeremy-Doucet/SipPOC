FROM node:16-alpine

ARG DATABASE_URL

RUN mkdir -p /app
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY . .

RUN yarn build
# EXPOSE 3000
CMD ["yarn", "runDocker"]