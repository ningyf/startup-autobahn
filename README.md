## 环境搭建

使用nvm管理node.js的安装包和版本 https://github.com/creationix/nvm

使用最新版本（8.9.4）node.js

拉取代码，在项目目录下执行

````
-- 全局安装gulp
npm install -g gulp

-- 安装依赖
npm install
````

这是创建本项目时执行的命令，您不再需要执行

````
-- 初始化项目
npm init --yes

-- 全局安装gulp
npm install -g gulp

npm install --save-dev <gulp插件的依赖列表，详情见gulpfile.js源文件>
````

## 调试和产品打包

````
gulp
````

`app`目录是测试目录，`dist`是产品分发目录


## 构建镜像以及运行


### 本地打包

cd nginx && sudo bash run_build.shell

### 推送到docker registry

````
sudo docker login --username=guangwei@1752411334365080 registry.cn-beijing.aliyuncs.com
docker tag startupautobahn/nginx:latest registry.cn-beijing.aliyuncs.com/startupautobahn/nginx:x
docker push registry.cn-beijing.aliyuncs.com/startupautobahn/nginx:x
````

### 生产环境
sudo ssh -i ~/daimler/startupautobahn/startup_autobahn_ssh root@123.206.88.115

docker pull registry.cn-beijing.aliyuncs.com/startupautobahn/nginx:x &&  docker rm -f nginx && docker run --name nginx -d -p 80:80 --link backend:api -v ~/startupautobahn/nginx/logs:/logs registry.cn-beijing.aliyuncs.com/startupautobahn/nginx:x


