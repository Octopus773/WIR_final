# a Dockerfile to build the expo web app and serve it with nginx
#
# Build the app
FROM node:16-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

ENV API_URL=http://meilisearch:7700/
ENV NGINX_PORT=80

# Serve the app
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

CMD envsubst '$API_URL $NGINX_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'