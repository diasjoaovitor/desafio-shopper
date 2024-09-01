FROM node:iron-alpine3.20
RUN apk add --no-cache bash
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x wait-for-it.sh
RUN npm run build
CMD ./wait-for-it.sh ${POSTSTGRES_HOST:-database}:${POSTGRES_PORT:-5432} --timeout=60 --strict -- \
    npx ts-node --transpile-only ./node_modules/.bin/knex migrate:latest --knexfile src/database/knexfile.ts && \
    npm run start:prod
