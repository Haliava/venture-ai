FROM node:23-alpine3.21 as build

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80