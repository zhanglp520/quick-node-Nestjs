#!/bin/sh
#部署后端服务
cd /ainiteam/order/server
tar -zcvf backup_order-web."$(date '+%Y%m%d%H%M%S')".tar.gz dist
rm -rf dist
rm -rf package.json
rm -rf tsconfig.json
rm -rf Dockerfile
rm -rf docker-compose.yml
rm -rf startup.sh
cd temp
tar -zxvf dist.tar.gz -C /ainiteam/order/server
cd ..
rm -rf temp

#启动防火墙，放行3101端口
systemctl start firewalld
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --zone=public --add-port=3101/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-ports
systemctl restart docker

#后端服务通过容器启动服务
docker-compose pull
docker-compose build --no-cache
docker-compose up -d
docker-compose logs