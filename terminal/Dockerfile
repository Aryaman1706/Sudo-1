FROM node:lts-alpine3.13

USER node

WORKDIR /pty

COPY --chown=node:node ./pty .

RUN ["npm", "i"]

WORKDIR /home/app

CMD [ "node", "/pty/app.js" ]