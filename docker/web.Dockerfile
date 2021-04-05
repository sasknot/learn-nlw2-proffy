FROM node:14.16.0-alpine3.13

WORKDIR /var/www
COPY web/package.json .
COPY web/package-lock.json .
RUN npm ci
COPY web .

CMD ["npm", "start"]

EXPOSE 8090
