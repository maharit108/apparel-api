#!/bin/bash

API="http://localhost:4741"
URL_PATH="/items"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "item": {
      "name": "'"${NAME}"'",
      "description": "'"${DESC}"'",
      "price": "'"${PRICE}"'",
      "stock": "'"${NUM}"'",
      "itemImg": "'"${IMG}"'",
      "tags": "'"${TAG}"'"
    }
  }'

echo
