FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
EXPOSE 3001
COPY . .
ADD startServer.sh /
RUN chmod +x /startServer.sh
CMD ["/startServer.sh"]