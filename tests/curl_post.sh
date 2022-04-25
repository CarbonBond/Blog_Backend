#!/usr/bin/bash

clear

printf "\n Logging in..."

TOKEN="`. curl_login.sh $1`"

printf "\n\n_____________Get all Posts_____________\n"

curl localhost:3000/api/version/1/posts \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"



printf "\n\n_____________Create one Post_____________\n"


NEW_POST_ID=$(curl localhost:3000/api/version/1/post/new \
    -s \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title": "Curl Title", "content": "curl_test_creation", "categories": [{"category_id": 3}, {"category_id": 2}]}')

printf "$NEW_POST_ID"

printf "\n\n_____________Get one Category_____________\n"

curl localhost:3000/api/version/1/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"


printf "\n\n_____________Update one Category_____________\n"


curl localhost:3000/api/version/1/post/$NEW_POST_ID \
    -s \
    -X PUT \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title": "Curl Updated Title", "content": "curl_test_Update", "categories": [{"category_id": 3}, {"category_id": 2}]}'

printf "\n\n_____________Get Updated Category_____________\n"

curl localhost:3000/api/version/1/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________Delete one Category_____________\n"

curl localhost:3000/api/version/1/post/$NEW_POST_ID \
    -s \
    -X DELETE \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________Check Deleted Catgory_____________\n"

curl localhost:3000/api/version/1/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n"