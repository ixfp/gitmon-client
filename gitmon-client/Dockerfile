FROM node:lts AS build
RUN mkdir /app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx AS runtime
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3100
CMD ["nginx", "-g", "daemon off;"]