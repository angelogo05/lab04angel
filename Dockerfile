FROM node:18-bullseye
WORKDIR /app
EXPOSE 8080
COPY . .
RUN npm install
CMD ["npm", "start" ]