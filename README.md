# 项目说明

使用 koa，项目结构参考 [SpaceX-API](https://github.com/r-spacex/SpaceX-API)

## 配置文件 `.env` 内容

例子及格式：

```config
# 环境
# NODE_ENV=production

# API 服务端口
PORT=8080

```

## 运行指南

普通运行：

```shell
npm i
npm start
```

调试运行：

```shell
npm i -g nodemon # 全局安装 nodemon
npm run dev
```

注意：Windows 控制台中文乱码，执行 `chcp 65001` 详情：https://ss64.com/nt/chcp.html

**VS Code** `Ctrl + Shift + D` 点击调试，附加刚刚启动的 `nodemon` 进程

## 目录说明

```
├─ .env                                        # 环境配置（git 忽略）
├─ .eslintrc                                   # eslint 配置
├─ .gitignore                                  # git 忽略项
├─ .nvmrc                                      # nvm 配置
├─ .prettierrc                                 # prettier 配置
├─ README.md                                   # 项目说明
├─ app.js                                      # 项目入口
├─ docs                                        # 文档 文件夹
│    ├─ README.md                              # 文档说明
│    ├─ schema                                 # 表设计 文件夹
│    │    └─ users.md
│    └─ weixin                                 # 微信相关 API 文件夹
│           └─ v1
├─ lib                                         # 工具方法 文件夹
├─ middleware                                  # 中间件 文件夹
├─ package-lock.json
├─ package.json
├─ routes                                      # 路由，包含每个 API 的事务处理
├─ server.js                                   # 项目服务启动
```
