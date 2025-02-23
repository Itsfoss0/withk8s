FROM node:lts-alpine3.21  AS build
WORKDIR  /usr/src/app
COPY ./package.json . 
RUN npm install 
COPY . /usr/src/app/

RUN npm run build

# run stage
FROM node:7.1.0-alpine
WORKDIR /usr/src/app 
COPY --from=build /usr/src/app .
RUN npm install -g serve; \
    adduser -D appuser

USER appuser
EXPOSE 3000
ENTRYPOINT [ "serve", "-s" "dist", "-l",  "3000" ]

