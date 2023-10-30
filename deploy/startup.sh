#!/bin/sh
#部署后端服务
cd /ainiteam/server/quick
tar -zcvf backup_quick-web."$(date '+%Y%m%d%H%M%S')".tar.gz dist
rm -rf dist
rm -rf package.json
rm -rf tsconfig.json
rm -rf Dockerfile
rm -rf docker-compose.yml
rm -rf startup.sh
cd temp
tar -zxvf dist.tar.gz -C /ainiteam/server/quick
cd ..
rm -rf temp

#启动防火墙，放行3101端口
systemctl start firewalld
firewall-cmd --zone=public --add-port=3101/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-ports
systemctl restart docker

#quick后端通过容器启动服务
docker-compose pull
docker-compose build --no-cache
docker-compose up -d
docker-compose logs