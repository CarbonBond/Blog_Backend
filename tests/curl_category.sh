#!/usr/bin/bash

clear

printf "\n Logging in..."

TOKEN="`. curl_login.sh $1`"

printf "\n\n_____________Get all Categories_____________\n"

curl localhost:3000/api/version/1/categories \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"



printf "\n\n_____________Create one Category_____________\n"


NEW_CATAGORY_ID=$(curl localhost:3000/api/version/1/category/new \
    -s \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name": "curl_test_creation", "id": 0}')

printf "$NEW_CATAGORY_ID"

printf "\n\n_____________Get one Category_____________\n"

curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"


printf "\n\n_____________Update one Category_____________\n"


curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X PUT \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name": "curl_test_update", "id": 0}'

printf "\n\n_____________Get Updated Category_____________\n"

curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________Delete one Category_____________\n"

curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X DELETE \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________Check Deleted Catgory_____________\n"

curl localhost:3000/api/version/1/category/$NEW_CATAGORY_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n"