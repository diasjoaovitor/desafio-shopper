#!/bin/bash

function cleanup {
  npm run services:down
  PID=$(lsof -t -i:3005)
  if [ -n "$PID" ]; then
    kill $PID
  fi
  exit 0
}

trap cleanup INT

npm run services:up && npm run start:dev
