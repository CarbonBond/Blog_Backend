FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

run npm run fixPrisma

ENV PORT=80

EXPOSE 80

CMD [ "npm", "start"]
