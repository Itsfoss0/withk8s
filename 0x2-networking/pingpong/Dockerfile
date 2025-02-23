FROM node:lts-alpine3.21

WORKDIR /usr/app/

RUN adduser -D appuser


COPY package.json .

RUN npm install 

COPY . /usr/app/


EXPOSE  3000

ENTRYPOINT [ "npm",  "start" ]