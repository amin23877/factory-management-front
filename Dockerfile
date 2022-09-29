FROM node:16-alpine
WORKDIR /usr/src/app
ENV DISABLE_ESLINT_PLUGIN=true
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "npm", "start" ]
