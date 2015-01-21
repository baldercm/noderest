# Pull base image.
FROM dockerfile/nodejs

MAINTAINER Bálder Carraté <baldercm@gmail.com>

# Define working directory.
WORKDIR /app

# Setup node environment.
ADD package.json /app/
RUN npm install
ADD . /app

ENV NODE_ENV docker

# Define default command.
CMD ["npm", "start"]

# Expose ports.
EXPOSE 8080
