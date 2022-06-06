FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY . .

RUN yarn build
# EXPOSE 3000
CMD ["yarn", "dev"]