FROM node:4.2.1
COPY . /var/www
WORKDIR /var/www

RUN npm install -g gulp

# Create a nonroot user, and switch to it
RUN /usr/sbin/useradd --create-home --home-dir /usr/local/nonroot --shell /bin/bash nonroot
RUN chown -R nonroot /var/www
USER nonroot

# Set the HOME var, npm install gets angry if it can't write to the HOME dir,
# which will be /root at this point
ENV HOME /usr/local/nonroot

EXPOSE 3500
ENV NODE_ENV=prod
RUN npm rebuild node-sass
RUN npm install
RUN gulp build
