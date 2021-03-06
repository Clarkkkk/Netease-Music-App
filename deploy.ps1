#!/usr/bin/env sh

# 当发生错误时中止脚本
# set -e

# 构建
echo "### npm run build ###"
npm run build -- --modern

# cd 到构建输出的目录下 
echo "### git deploying ###"
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

echo "### git pushing ###"
git push -f https://github.com/Clarkkkk/Netease-Music-Page.git master

cd..
echo "### complete ###"
