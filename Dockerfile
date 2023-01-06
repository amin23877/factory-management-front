FROM node:16-alpine
WORKDIR /usr/src/app
ENV DISABLE_ESLINT_PLUGIN=true
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD [ "serve", "-s", "build", "-l", "3000" ]