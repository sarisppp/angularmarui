FROM node:16 as build

WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm run prod
COPY . .
FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/ngix/ngix.conf
COPY --from=build /app/dist/angular-docker/ /usr/share/nginx/html