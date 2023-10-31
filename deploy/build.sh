#提权
# chmod +x ./deploy/build.sh
# ./deploy/build.sh

#后端服务打包
cd /var/lib/jenkins/workspace/quick-server
npm config set registry https://registry.npm.taobao.org
npm config get registry
node -v
npm -v
pnpm -v
pnpm install
pnpm run build
rm -rf temp
mkdir temp
mv  dist /var/lib/jenkins/workspace/quick-server/temp
cp package.json /var/lib/jenkins/workspace/quick-server/temp
cp tsconfig.json /var/lib/jenkins/workspace/quick-server/temp
cp ./deploy/Dockerfile /var/lib/jenkins/workspace/quick-server/temp
cp ./deploy/docker-compose.yml /var/lib/jenkins/workspace/quick-server/temp
cp ./deploy/startup.sh /var/lib/jenkins/workspace/quick-server/temp
cd /var/lib/jenkins/workspace/quick-server/temp
tar -zcvf dist.tar.gz *