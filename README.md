
# TutorConnect-Platform

TutorConnect-Platform 是一个为师生提供在线预约、课程管理和评价的全栈平台。项目采用前后端分离架构，前端基于 Vue.js，后端基于 Node.js + Express + MongoDB（Mongoose）。

## 目录结构

```
.
├── client/           # 前端 Vue 应用
│   ├── public/       # 静态资源
│   └── src/          # 源码（组件、路由、服务等）
├── server/           # 后端 Node.js/Express 服务
│   ├── controllers/  # 控制器
│   ├── middlewares/  # 中间件
│   ├── models/       # 数据模型（Mongoose Schema）
│   ├── routes/       # 路由
│   └── config/       # 配置
├── database/         # 数据库配置与种子数据
└── README.md
```

## 功能简介

- 用户注册、登录与认证
- 教师列表与详情浏览
- 课程预约与日程管理
- 课程评价与打分

## 技术栈

- 前端：Vue.js, Vue Router, SCSS
- 后端：Node.js, Express, Mongoose（MongoDB ODM）
- 数据库：MongoDB

## 安装与运行

### 1. 克隆项目

```powershell
git clone https://github.com/serine-0421/TutorConnect-Platform.git
cd TutorConnect-Platform
```

### 2. 安装依赖

#### 后端

```powershell
cd server
npm install
```

#### 前端

```powershell
cd ../client
npm install
```

### 3. 配置 MongoDB

请确保本地或远程已安装并启动 MongoDB。
在 `server/config/database.js` 或 `.env` 文件中配置 MongoDB 连接字符串，例如：

```
MONGODB_URI=mongodb://localhost:27017/tutorconnect
```

### 4. 初始化数据库

如有种子脚本，可运行：

```powershell
# 进入 server 目录
cd server
node seed.js
```

### 5. 启动服务

#### 后端

```powershell
npm start
```

#### 前端

```powershell
cd ../client
npm run serve
```

前端默认运行在 `http://localhost:8080`，后端默认运行在 `http://localhost:3000`。

## 主要目录说明

- `client/src/components/`：前端组件
- `client/src/views/`：页面视图
- `client/src/router/`：前端路由
- `client/src/services/`：API 服务与工具
- `server/models/`：Mongoose 数据模型
- `server/controllers/`：后端业务逻辑
- `server/routes/`：API 路由
- `database/`：数据库配置与种子数据

## 贡献

欢迎提交 issue 和 PR！

## License

MIT
