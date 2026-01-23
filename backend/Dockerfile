FROM node:20-slim

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY ..

EXPOSE 8000

CMD ["npm", "server.js"]