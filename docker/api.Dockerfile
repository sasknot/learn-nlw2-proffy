FROM node:14.16.0-alpine3.13

WORKDIR /var/www
COPY api/package.json .
COPY api/package-lock.json .
RUN npm ci
COPY api .

CMD ["npm", "run", "dev"]

EXPOSE 8090
