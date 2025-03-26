#!/usr/bin/env sh

# Get random wikipedia article
URL=$(curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -i location |
  cut -d ":" -f 2- | tr -d '\r ')

if [ "$URL" ]; then
  echo "{ \"todo\": \"Read $URL\" }" > data.json
  curl -X POST -H 'Content-Type: application/json' -d @data.json "$API_URL"
  echo

else
  echo " $[-] Error: could not get wikipedia article URL, exiting"
  exit 1

fi
