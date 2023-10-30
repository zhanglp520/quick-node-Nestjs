FROM node:18.17.1

RUN mkdir -p /ainiteam/iot/server

WORKDIR /ainiteam/iot/server

RUN npm config set registry https://registry.npm.taobao.org/

RUN npm install -g npm

RUN npm install pnpm -g

COPY package*.json ./

RUN pnpm install

# COPY . .

EXPOSE 3101

CMD [ "pnpm", "run", "start:prod" ]