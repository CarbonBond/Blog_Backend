#!/usr/bin/bash

clear

printf "\n Logging in..."

TOKEN="`. curl_login.sh $1`"

printf "\n\n_____________Get all Public Posts_____________\n"

curl localhost:3000/api/v/1/public/post \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________Get all Posts_____________\n"

curl localhost:3000/api/v/1/post \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________ Post: Limit Name _____________\n"

curl 'localhost:3000/api/v/1/post?limit=title' \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"


printf "\n\n_____________Create one Post_____________\n"


NEW_POST_ID=$(curl localhost:3000/api/v/1/post/new \
    -s \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title": "Curl Title", "published": true, "content": "# curl_test_creation \n- [x] Task 1 \n- [x] Task 2", "categories": [{"category_id": 3}, {"category_id": 2}]}')

printf "$NEW_POST_ID"

printf "\n\n_____________Get one Post_____________\n"

curl localhost:3000/api/v/1/public/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \

printf "\n\n_____________Get one Post MARKDOWN_____________\n"

curl localhost:3000/api/v/1/post/$NEW_POST_ID/md \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN"


printf "\n\n_____________Update one Post_____________\n"


curl localhost:3000/api/v/1/post/$NEW_POST_ID \
    -s \
    -X PUT \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title": "Curl Updated Title", "published": true,"content": "curl_test_Update", "categories": [{"category_id": 3}, {"category_id": 2}]}'

printf "\n\n_____________Get Updated Post_____________\n"

curl localhost:3000/api/v/1/public/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \

printf "\n\n_____________Update post not published_____________\n"


curl localhost:3000/api/v/1/post/$NEW_POST_ID \
    -s \
    -X PUT \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title": "Curl Updated Title", "published": false, "content": "curl_test_Update", "categories": [{"category_id": 3}, {"category_id": 2}]}'

printf "\n\n_____________Get not published Post_____________\n"

curl localhost:3000/api/v/1/public/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \

printf "\n\n_____________Get not published Post Auth_____________\n"

curl localhost:3000/api/v/1/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________Delete one Post_____________\n"

curl localhost:3000/api/v/1/post/$NEW_POST_ID \
    -s \
    -X DELETE \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n_____________Check Deleted Post_____________\n"

curl localhost:3000/api/v/1/post/$NEW_POST_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN"

printf "\n\n"
