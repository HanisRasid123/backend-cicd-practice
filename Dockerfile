#specify base image
FROM node:18.18.0-slim

WORKDIR /src

ADD . /src

RUN npm install

CMD pm2 start process.yml && tail -f /dev/null

EXPOSE 8000