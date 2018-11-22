FROM mhart/alpine-node:9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install --prod
COPY . /usr/src/app

ENV NODE_ENV production

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "prod"]
