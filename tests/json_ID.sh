#!/usr/bin/bash

STRING=$1
KEY=$2


echo $STRING | grep -Po '"'$KEY'":\"?\K[^"]*'
