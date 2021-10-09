FROM node:16.10.0-alpine

ARG SERVICE

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY ./helpers ./helpers
COPY ./modules/${SERVICE} .

EXPOSE 80

ENTRYPOINT [ "npm", "start" ]
