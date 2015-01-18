#!/bin/bash
set -e

WORKING_DIR=$(dirname $0)
APP_DIR=$(dirname "$WORKING_DIR/../..")
DIST_DIR=${APP_DIR}/dist
DIST_DOCKER_DIR=${DIST_DIR}/docker

echo -e "\n *** Preparing Docker environment"

rm -Rf ${DIST_DIR}
mkdir -p ${DIST_DOCKER_DIR}


cp -R ${APP_DIR}/lib ${DIST_DOCKER_DIR}

if [ "$1" != "aws" ]; then
  mv ${DIST_DOCKER_DIR}/lib/configDocker.js ${DIST_DOCKER_DIR}/lib/config.js
  rm -f ${DIST_DOCKER_DIR}/lib/configAws.js
else
  mv ${DIST_DOCKER_DIR}/lib/configAws.js ${DIST_DOCKER_DIR}/lib/config.js
  rm -f ${DIST_DOCKER_DIR}/lib/configDocker.js
fi

cp ${APP_DIR}/Dockerfile ${DIST_DOCKER_DIR}
cp ${APP_DIR}/index.js ${DIST_DOCKER_DIR}
cp ${APP_DIR}/package.json ${DIST_DOCKER_DIR}
cp ${APP_DIR}/scripts/docker-start.sh ${DIST_DOCKER_DIR}
cp ${APP_DIR}/scripts/docker-stop.sh ${DIST_DOCKER_DIR}

cd ${DIST_DOCKER_DIR}
echo `pwd`
zip -qr noderest-docker.zip Dockerfile package.json index.js lib
mv noderest-docker.zip ..

echo -e "\n *** Done!" && exit 0
