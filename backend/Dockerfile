FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY README.md .

EXPOSE 8004

CMD ["npm", "start"]
