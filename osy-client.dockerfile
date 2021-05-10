FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
EXPOSE 5000
COPY . .
RUN npm run build
RUN npm i -g serve
ADD startClient.sh /
RUN chmod +x /startClient.sh
CMD ["/startClient.sh"]