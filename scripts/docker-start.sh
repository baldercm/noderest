#!/bin/bash
set -e

red='\e[0;31m'
green='\e[0;32m'
NC='\e[0m' # No Color
WORKING_DIR=$(dirname $0)
STARTUP_TIMEOUT=30
STARTUP_TIME=0

bash ${WORKING_DIR}/docker-stop.sh

echo -e "\n *** Building Docker image noderest"
docker build --force-rm=true -t noderest ${WORKING_DIR}

echo "Running Docker container mongodb..."
docker run -d --name mongodb dockerfile/mongodb mongod --smallfiles

# Wait for mongodb startup
while [ $STARTUP_TIME -le $STARTUP_TIMEOUT ]; do
    echo -n "."
    STARTUP_TIME=$(( $STARTUP_TIME + 1 ))
    if `docker logs mongodb | grep -q 'waiting for connections'` ; then
      break
    fi
    sleep 1
done

echo -e "\n *** Running Docker container noderest"
docker run -d -p 8080:8080 --name noderest --link mongodb:mongodb noderest

# Wait for noderest startup
while [ ${STARTUP_TIME} -le ${STARTUP_TIMEOUT} ]; do
    echo -n "."
    STARTUP_TIME=$(( $STARTUP_TIME + 1 ))
    if `docker logs noderest | grep -q 'noderest listening'` ; then
      break
    fi
    sleep 1
done
echo ""

if [ ${STARTUP_TIME} -le ${STARTUP_TIMEOUT} ]; then
  echo -e "\n${green} *** Start noderest Docker environment OK${NC}\n" && exit 0
else
  echo -e "\n${red} *** Start noderest Docker environment TIMEOUT${NC}\n" >&2 && exit 1
fi
