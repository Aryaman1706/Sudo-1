FROM node:lts

WORKDIR /pty

COPY  ./pty .

RUN ["npm", "ci"]

EXPOSE 8080

CMD [ "node", "app.js" ]