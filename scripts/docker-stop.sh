#!/bin/bash
set -e

if `docker ps | grep -q 'noderest'` ; then
  echo -e "\n *** Stopping noderest Docker containers"
  docker stop noderest
fi
if `docker ps -a | grep -q 'noderest'` ; then
  echo -e "\n *** Removing noderest Docker containers"
  docker rm -f noderest
fi
if `docker images | grep -q 'noderest'` ; then
  echo -e "\n *** Removing noderest Docker images"
  docker rmi -f noderest
fi
if `docker ps | grep -q 'mongodb'` ; then
  echo -e "\n *** Stopping mongodb Docker containers"
  docker stop mongodb
fi
if `docker ps -a | grep -q 'mongodb'` ; then
  echo -e "\n *** Removing mongodb Docker containers"
  docker rm -f mongodb
fi

echo "" && exit 0
