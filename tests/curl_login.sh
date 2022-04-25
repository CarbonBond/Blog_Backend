#!/usr/bin/bash
EMAIL="cheeseburgerbbgun@gmail.com"
PASSWORD=$1

LOGIN=$(curl localhost:3000/auth/login \
    -s \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"username": "'$EMAIL'", "password": "'$PASSWORD'"}')

echo $LOGIN | grep -Po '"token":\"?\K[^"]*'
