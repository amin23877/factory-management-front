FROM node:16-alpine
WORKDIR /usr/src/app
ENV DISABLE_ESLINT_PLUGIN=true
COPY package*.json ./
RUN npm i --force
COPY . .
RUN sed -i 's/ForkTsCheckerWebpackPlugin.DEFAULT_MEMORY_LIMIT = 2048/ForkTsCheckerWebpackPlugin.DEFAULT_MEMORY_LIMIT = 512/g' node_modules/fork-ts-checker-webpack-plugin/lib/index.js
RUN node --max-old-space-size=512 node_modules/.bin/react-scripts build
RUN npm install -g serve
EXPOSE 3000
CMD [ "serve", "-s", "build", "-l", "3001" ]
