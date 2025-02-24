FROM node:lts-alpine3.21
WORKDIR /usr/src/app 
RUN adduser -D appuser 
ENV PORT=4000

COPY ./package.json /usr/src/app/
RUN npm install 

COPY . /usr/src/app/

USER appuser

EXPOSE 4000

ENTRYPOINT [ "npm", "start"]