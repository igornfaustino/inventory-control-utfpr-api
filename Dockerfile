FROM node:9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production

EXPOSE 8080

CMD [ "npm", "start" ]
