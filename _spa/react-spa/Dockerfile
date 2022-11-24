# https://gfgfddgleb.medium.com/deploy-react-application-with-docker-to-digitalocean-2cde093a8e94 @ 20/11/2022

# Pull node.js image
FROM node:19-alpine as build
WORKDIR /

# Install npm packages and cache this layer
COPY package*.json /
RUN npm install

# Build copy all source files and build React app
COPY ./ /
RUN npm run build

# Pull NGINX image
FROM nginx:1.23

# Move all build files to NGINX serve folder
COPY --from=build /build /usr/share/nginx/html

# Setup NGINX with config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
