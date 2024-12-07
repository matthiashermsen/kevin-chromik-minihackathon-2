# Build stage
FROM node:23-alpine3.19 AS build

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build


# Run stage
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html