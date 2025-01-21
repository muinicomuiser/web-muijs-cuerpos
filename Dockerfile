FROM node:latest AS builder

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN npm install

RUN npm run build
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/web-muijs /usr/share/nginx/html
# COPY /dist/web-muijs /usr/share/nginx/html
EXPOSE 80