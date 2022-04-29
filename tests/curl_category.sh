#!/usr/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
YELLOW='\033[1;33m'
clear

printf "\n Logging in..."

TOKEN="`. curl_login.sh $1`"

printf "\n\n${YELLOW}_____________Get all Categories_____________${NC}\n"

GET_ALL=$(curl localhost:3000/api/v/1/public/categories \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN")
printf "$GET_ALL"

if [[ $GET_ALL != '[]' ]]
then
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi

printf "\n\n${YELLOW}_____________Get Categories with name containing WebAssembly, ID = 135_____________${NC}\n"

CHECK_SEARCH=$(curl 'localhost:3000/api/v/1/public/categories?search[name]=WebAssembly&search[id]=135' \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN")

printf "$CHECK_SEARCH"

if [[ $CHECK_SEARCH = '[{"category_id":135,"name":"WebAssembly"}]' ]]
then
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi
 

printf "\n\n${YELLOW}_____________Create one Category_____________${NC}\n"


NEW_CATAGORY_ID=$(curl localhost:3000/api/v/1/category/new \
    -s \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name": "curl_test_creation"}')

printf "$NEW_CATAGORY_ID"

if [[ $NEW_CATAGORY_ID -gt 0 ]]
then
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi

printf "\n\n${YELLOW}_____________Get created Category_____________${NC}\n"

GET_CATEGORY=$(curl localhost:3000/api/v/1/public/category/$NEW_CATAGORY_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN")
printf "$GET_CATEGORY"

GET_NAME_CREATED="`. json_ID.sh $GET_CATEGORY name`"

if [[ "curl_test_creation" = $GET_NAME_CREATED ]] #json_ID will return a comma if present
then
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi

printf "\n\n${YELLOW}_____________Update one Category_____________${NC}\n"


CHECK_UPDATED=$(curl localhost:3000/api/v/1/category/$NEW_CATAGORY_ID \
    -s \
    -X PUT \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name": "curl_test_update", "id": 0}')

printf "$CHECK_UPDATED"

if [[ "updated" = $CHECK_UPDATED ]] #json_ID will return a comma if present
then
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi



printf "\n\n${YELLOW}_____________Get Updated Category_____________${NC}\n"

GET_UPDATED=$(curl localhost:3000/api/v/1/category/$NEW_CATAGORY_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN")

printf "$GET_UPDATED"

GET_UPDATED_NAME="`. json_ID.sh $GET_UPDATED name`"
if [[ "curl_test_update" = $GET_UPDATED_NAME ]] #json_ID will return a comma if present
then
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi

printf "\n\n${YELLOW}_____________Delete one Category_____________${NC}\n"

CHECK_DELETE=$(curl localhost:3000/api/v/1/category/$NEW_CATAGORY_ID \
    -s \
    -X DELETE \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN")

printf "$CHECK_DELETE"
if [[ "Deleted" = $CHECK_DELETE ]] #json_ID will return a comma if present
then
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi

printf "\n\n${YELLOW}_____________Check Deleted Catgory_____________${NC}\n"

CHECK_DELETED=$( curl localhost:3000/api/v/1/category/$NEW_CATAGORY_ID \
    -s \
    -X GET \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $TOKEN" )

printf "$CHECK_DELETED"

if [[ $CHECK_DELETED = "Category not found" ]]
then 
    printf "\n${GREEN} Success ${NC}"
else 
    printf "\n${RED}FAILED${NC}"
fi

printf "\n\n"