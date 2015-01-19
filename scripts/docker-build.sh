#!/bin/bash
set -e

WORKING_DIR=$(dirname $0)
cd $WORKING_DIR/..

DIST_DIR="./dist"
DIST_DOCKER_DIR="${DIST_DIR}/docker"

echo -e "\n *** Preparing Docker environment"

rm -Rf ${DIST_DIR}
mkdir -p ${DIST_DOCKER_DIR}


cp -R ./lib ${DIST_DOCKER_DIR}

if [ "$1" != "aws" ]; then
  mv ${DIST_DOCKER_DIR}/lib/configDocker.js ${DIST_DOCKER_DIR}/lib/config.js
  rm -f ${DIST_DOCKER_DIR}/lib/configAws.js
else
  mv ${DIST_DOCKER_DIR}/lib/configAws.js ${DIST_DOCKER_DIR}/lib/config.js
  rm -f ${DIST_DOCKER_DIR}/lib/configDocker.js
fi

cp ./Dockerfile ${DIST_DOCKER_DIR}
cp ./index.js ${DIST_DOCKER_DIR}
cp ./package.json ${DIST_DOCKER_DIR}
cp ./scripts/docker-start.sh ${DIST_DOCKER_DIR}
cp ./scripts/docker-stop.sh ${DIST_DOCKER_DIR}

cd ${DIST_DOCKER_DIR}
zip -qr noderest-docker.zip *
mv noderest-docker.zip ..

echo -e "\n *** Done!" && exit 0
