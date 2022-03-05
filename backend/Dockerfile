FROM node:16.14.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . ./
EXPOSE 8000
CMD yarn start