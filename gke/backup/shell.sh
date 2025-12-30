#!/usr/bin/env bash
set -e

if [ $URL ]
then
  pg_dump -v $URL > /usr/src/app/backup.sql

  echo "Not sending the dump actually anywhere"
  # curl -F ‘data=@/usr/src/app/backup.sql’ https://somewhere
fi