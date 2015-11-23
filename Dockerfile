FROM node:4.2.2
WORKDIR /var/www

RUN npm install -g gulp --loglevel error

# cache the npm install process separately
ADD package.json /var/www/package.json
RUN npm install

ADD . /var/www
VOLUME /var/www/server/public/upload

EXPOSE 3500
ENV NODE_ENV=prod
RUN npm rebuild node-sass
RUN npm install --loglevel error
RUN gulp build
