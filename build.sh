#!/bin/bash

# 全局安装 nvm
if ! command -v nvm &> /dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    # 加载 nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# 使用 nvm 安装并切换到 Node 18.20.0
nvm install 20.19.0
nvm use 20.19.0
nvm alias default 20.19.0

# 检查是否安装了 Yarn，如果没有则安装
if ! command -v yarn &> /dev/null; then
    npm install -g yarn
fi

# 进入项目根目录
cd "$(dirname "$0")"

# 进入 frontend 目录
cd ./frontend || exit

# 安装项目依赖
yarn install

# 执行 yarn build 命令
yarn build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    # 创建 output 目录（如果不存在）
    mkdir -p ../output

    # 将构建产物移动到 output 目录
    mv dist/* ../output/
else
    echo "构建失败，请检查错误信息。"
fi