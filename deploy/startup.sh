#!/bin/sh

#提权
# chmod +x startup.sh
# ./startup.sh

# 需要传输的文件
# temp/dist.tar.gz

#部署后端服务
cd /ainiteam/quick/server
tar -zcvf backup_quick-web."$(date '+%Y%m%d%H%M%S')".tar.gz dist
rm -rf dist
rm -rf package.json
rm -rf tsconfig.json
rm -rf Dockerfile
rm -rf docker-compose.yml
rm -rf startup.sh
cd temp
tar -zxvf dist.tar.gz -C /ainiteam/quick/server
cd ..
rm -rf temp

#启动防火墙，放行3101端口
systemctl start firewalld
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --zone=public --add-port=3101/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-ports
systemctl restart docker

#通过容器启动后端服务
docker-compose pull
docker-compose build --no-cache
docker stop quick-server
docker rm quick-server
docker stop quick-mysql
docker rm quick-mysql
docker-compose up -d
docker-compose logs