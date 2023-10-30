#quick后端打包
cd /var/lib/jenkins/workspace/quick-nestjs
npm config set registry https://registry.npm.taobao.org
npm config get registry
node -v
npm -v
pnpm -v
pnpm install
pnpm run build
rm -rf temp
mkdir temp
mv  dist /var/lib/jenkins/workspace/quick-nestjs/temp
cp package.json /var/lib/jenkins/workspace/quick-nestjs/temp
cp tsconfig.json /var/lib/jenkins/workspace/quick-nestjs/temp
cp ./deploy/Dockerfile /var/lib/jenkins/workspace/quick-nestjs/temp
cp ./deploy/docker-compose.yml /var/lib/jenkins/workspace/quick-nestjs/temp
cp ./deploy/startup.sh /var/lib/jenkins/workspace/quick-nestjs/temp
cd cd /var/lib/jenkins/workspace/quick-nestjs/temp
tar -zcvf dist.tar.gz *