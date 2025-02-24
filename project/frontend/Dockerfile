ARG BACKEND_URL
FROM node:lts-alpine3.21  AS build
WORKDIR  /usr/src/app
COPY ./package.json . 
RUN npm install 
COPY . /usr/src/app/
ENV VITE_BACKEND_URL=${BACKEND_URL}
ENV BACKEND_URL=${BACKEND_URL}
RUN echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" >> .env
RUN npm run build

# run stage
FROM node:lts-alpine3.21
WORKDIR /usr/src/app 
COPY --from=build /usr/src/app .
RUN npm install -g serve; \
    adduser -D appuser

USER appuser
EXPOSE 3000
ENTRYPOINT [ "serve", "dist", "-l",  "3000" ]

