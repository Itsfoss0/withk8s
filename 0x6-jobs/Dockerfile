FROM alpine:latest

WORKDIR /app/main 

RUN apk add curl

COPY . .

ENTRYPOINT [ "./script.sh" ] 