FROM node:16-alpine AS base

RUN apk update && apk upgrade

# required for cloning with ssh
RUN apk add openssh git

WORKDIR /source

# setup ssh id_rsa keys to clone private repo
COPY id_rsa /root/.ssh/id_rsa
COPY id_rsa.pub /root/.ssh/id_rsa.pub
COPY ssh-config /root/.ssh/config
RUN chmod 600 /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa.pub
# add github to known hosts
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
# clone explorer frontend and checkout single branch
ARG BUILD_BRANCH
RUN git clone -b $BUILD_BRANCH --single-branch git@github.com:phantasma-io/ExplorerFrontend.git

# create new source directory
WORKDIR /source/ExplorerFrontend
RUN git submodule update --init --recursive

RUN npm install

FROM base AS build

RUN yarn next build

FROM build AS final