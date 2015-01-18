# NodeRest
[![Build Status](https://travis-ci.org/balder-otium360/noderest.svg?branch=master)](https://travis-ci.org/balder-otium360/noderest)

NodeJS simple prototype for REST like backend using:
+ Express
+ Mongoose

## Overview

* [Software Requirements](#software-requirements)
* [Basic Usage](#basic-usage)
* [Docker](#docker)
* [REST API](#rest-api)

## Software Requirements

* NodeJs v0.10 (no global modules required)


## Basic Usage

* Install NodeJs dependencies

        npm install
* Run unit tests

        npm test
* Start app

        npm start
* Start app in development mode (watches for changes and reloads)

        npm run dev
* Build Docker container resources

        npm run build-docker
* Build for AWS Beanstalk

        npm run build-aws


## Docker

To build a fully functional Docker environment, simply use

    npm run build-docker

You will get something like this:

    dist/docker
    ├── lib
    |   ├── (app lib folder contents)
    ├── Dockerfile
    ├── docker-start.sh
    ├── docker-stop.sh
    ├── index.js
    ├── package.json
    dist/noderest-docker.zip

You can run the Docker containers using

    dist/docker/docker-start.sh

You can access the webapp pointing your browser or REST client to

    http://localhost:8080/noderest/contacts
(if you have no data you will only see `[]`, an empty JSON array).

To stop and remove all Docker containers and images use

    dist/docker/docker-stop.sh

## REST API

All the resource URIs consumes and produces `application/json`.

* `GET  http://localhost:8080/contacts` find all the existing contacts
* `GET  http://localhost:8080/contacts/:id` find contact by id
* `POST http://localhost:8080/contacs` creates a new contact
  -  JSON Body:

      ```json
      {
        "name": "Name",
        "age": "1"
      }
      ```


