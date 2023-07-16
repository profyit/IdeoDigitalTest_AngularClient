FROM node:18.2.0-alpine3.14 as build
WORKDIR /app
COPY package-lock.json package.json /app/
RUN npm ci && npm i -g @angular/cli@13.0.2
COPY  . .
RUN npm run build  --production

FROM nginxinc/nginx-unprivileged:1.22-alpine
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html/
EXPOSE 8080
