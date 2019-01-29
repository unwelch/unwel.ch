FROM mhart/alpine-node:9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn
COPY . /usr/src/app
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "run", "prod"]
