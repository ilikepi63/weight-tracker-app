FROM node:16.19.1-alpine

WORKDIR /usr

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

COPY swagger-doc.js ./

RUN ls -a

RUN npm install

RUN npm run build

FROM node:16.19.1-alpine

WORKDIR /usr

COPY package.json ./

RUN npm install --only=production

COPY --from=0 /usr/build .

RUN npm install pm2 -g

EXPOSE 80

CMD ["pm2-runtime","index.js"]