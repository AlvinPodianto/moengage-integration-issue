# base image
FROM node:18.15-bullseye-slim as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli@latest
RUN npm install -g --unsafe-perm gzipper
#RUN npm audit fix --force

# add app
COPY . /app

# generate build
ARG configuration=staging
RUN node --max_old_space_size=2048 ./node_modules/@angular/cli/bin/ng build --configuration=$configuration --output-path=www --aot --build-optimizer && gzipper compress --include js,html,scss,css,svg,json ./www
RUN npm run post-build $configuration 

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build /app/www /usr/share/nginx/html

# copy one-signal worker file
COPY build/one-signal /usr/share/nginx/html/one-signal

# Test copy Generated Sitemap
COPY src/sitemap.xml /usr/share/nginx/html
COPY src/sitemap /usr/share/nginx/html/sitemap
COPY src/info.json /usr/share/nginx/html/info.json
COPY src/.well-known.json /usr/share/nginx/html/.well-known/assetlinks.json
COPY src/apple-app-site-association.json /usr/share/nginx/html/.well-known/apple-app-site-association

COPY robots.stage.txt /usr/share/nginx/html/robots.txt

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
