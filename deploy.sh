#!/bin/bash

# 1. 构建项目
npm run build

# 2. 进入构建目录
cd dist

# 3. 确保目录不为空
if [ -z "$(ls -A .)" ]; then
  echo "错误：dist 目录为空！构建失败？"
  exit 1
fi

# 4. 创建 .nojekyll 文件（重要！）
touch .nojekyll

# 5. 创建 CNAME 文件（如果使用自定义域名）
# echo "yourdomain.com" > CNAME

# 6. 初始化 Git 仓库
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"

# 7. 设置远程仓库
git remote add origin git@github.com:molunanli/threejs-learning.git || true

# 8. 强制推送到 gh-pages 分支
git push -f origin gh-pages

echo "部署完成！"
cd -