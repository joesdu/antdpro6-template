# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

- 安装[yarn 4.x](https://yarnpkg.com/getting-started/install)包管理工具
- 要求 [Node.js](https://nodejs.org/en/download/) 的版本 >=18.6
- 以管理员身份打开命令提示符

```bash
# 使用管理员权限运行corepack命令
corepack enable
corepack prepare yarn@stable --activate
# 将yarn包管理工具安装到项目
yarn set version stable

# 安装项目依赖
yarn install
# 启动项目
yarn start
# 构建项目
yarn build
# 构建 Umi 运行时导出内容(如 model 写完后需要执行该命令,才能被 ts 语法提示器检测)
yarn postinstall
# 更新项目依赖
yarn upgrade-interactive
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

## 目前版本(官方代码版本)

- 2024-01-23 [8ff545e8f4008be3c2fa4b34d2c470ad978e5f2b](https://github.com/ant-design/ant-design-pro/tree/8ff545e8f4008be3c2fa4b34d2c470ad978e5f2b)
