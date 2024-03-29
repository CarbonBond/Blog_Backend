FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run fixPrisma

ENV PORT=80

EXPOSE 80

CMD [ "npm", "start"]
