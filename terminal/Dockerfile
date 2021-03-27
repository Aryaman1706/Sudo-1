FROM node:lts

WORKDIR /pty

COPY  ./pty/package.json .

COPY  ./pty/package-lock.json .

RUN ["npm", "ci"]

COPY ./pty/app.js .

WORKDIR /home/app

EXPOSE 8080

CMD [ "node", "/pty/app.js" ]