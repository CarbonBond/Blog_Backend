#!/usr/bin/bash

printf "\n Logging in... \n\n"

TOKEN="`. curl_login.sh $1`"

printf "_____________Get all Categories_____________\n"

curl localhost:3000/api/version/1/categories \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n"


printf "_____________Create one Categories_____________\n"


NEW_CATAGORY_ID=$(curl localhost:3000/api/version/1/category/new \
    -s \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name": "curl_test_creation", "id": 0}')

printf "$NEW_CATAGORY_ID\n\n"

printf "_____________Get one Categories_____________\n"


curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n"


printf "_____________Update one Categories_____________\n"


curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X PUT \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n"


printf "_____________Delete one Categories_____________\n"


curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X DELETE \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n"