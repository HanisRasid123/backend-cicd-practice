#specify base image
FROM node:18.18.0-slim

WORKDIR /src

ADD . /src

RUN npm install
RUN npm install -g pm2@latest

EXPOSE 8080

CMD pm2 start process.yml && tail -f /dev/null
