#!/bin/bash
set -e

WORKING_DIR=$(dirname $0)
cd $WORKING_DIR/..

DIST_DIR="./dist"
DIST_DOCKER_DIR="${DIST_DIR}/docker"

echo -e "\n *** Preparing Docker environment"

rm -Rf ${DIST_DIR}
mkdir -p ${DIST_DOCKER_DIR}

cp -R -t ${DIST_DOCKER_DIR} \
  ./lib \
  ./Dockerfile \
  ./index.js \
  ./package.json \
  ./scripts/docker-start.sh \
  ./scripts/docker-stop.sh \

if [ "$1" == "aws" ]; then
  ./node_modules/.bin/replace -s 'ENV NODE_ENV docker' 'ENV NODE_ENV aws' ${DIST_DOCKER_DIR}/Dockerfile
fi

cd ${DIST_DOCKER_DIR}
zip -qr noderest-docker.zip *
mv noderest-docker.zip ..

echo -e "\n *** Done!" && exit 0
