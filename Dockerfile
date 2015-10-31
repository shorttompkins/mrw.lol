FROM node:4.2.1
ADD . /var/www
WORKDIR /var/www
EXPOSE 3500
ENV NODE_ENV=prod
RUN npm install -g gulp
RUN npm install -g eslint eslint-plugin-react
RUN npm install
RUN gulp build
