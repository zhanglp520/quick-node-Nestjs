FROM node:18.17.1-bullseye-slim

ENV TZ=Asia/Shanghai \
  DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /ainiteam/quick/server

WORKDIR /ainiteam/quick/server

RUN npm config set registry https://registry.npm.taobao.org/

RUN npm install -g npm

RUN npm install pnpm -g

COPY package*.json ./

RUN pnpm install

# COPY . .

EXPOSE 3101

CMD [ "pnpm", "run", "start:prod" ]