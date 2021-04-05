FROM node:14.16.0-alpine3.13

WORKDIR /var/www/api
COPY api/package.json .
COPY api/package-lock.json .
RUN npm ci
COPY api .

WORKDIR /var/www/web
COPY web/package.json .
COPY web/package-lock.json .
RUN npm ci
COPY web .
RUN npm run build

RUN npm install -g http-server

CMD ["sh", "-c", "cd /var/www/api && npm start && http-server /var/www/web/build -p $PORT -d false"]
