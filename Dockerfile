# Stage 1 - Build Angular
#=========================
FROM node:23 AS ng-build

WORKDIR /src

RUN npm i -g @angular/cli

COPY client/public public
COPY client/src src
COPY *.json .

RUN npm ci && ng build

# Stage 2 - Build SpringBoot
#============================
FROM 