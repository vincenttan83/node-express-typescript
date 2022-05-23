FROM node:14
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
RUN npm install
COPY ./dist/index.js /usr/src/app/
EXPOSE 8000
CMD [ "node", "index.js" ]