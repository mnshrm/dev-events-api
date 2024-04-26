FROM node:alpine3.18
WORKDIR /app
COPY . /app
RUN npm install
CMD node server.js