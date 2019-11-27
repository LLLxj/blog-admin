# Specify base image
FROM node:alpine

# Install some dependencies
COPY . /app
WORKDIR /app/
RUN npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

RUN SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

RUN npm install
#RUN cd /app && pwd && ls -al
#RUN cd /app && cat Dockerfile
#RUN cd /app && cat package-lock.json

# Setup default command
CMD ["npm", "start"]
