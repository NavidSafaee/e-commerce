FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build


COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server"]

EXPOSE 3000
