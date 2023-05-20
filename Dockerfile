FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

ENV REACT_APP_BASE_URL=http://localhost:5000/api

CMD ["npm","run", "dev"]