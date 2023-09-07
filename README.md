# uniapp-vue3-TS-Pina-shop
uni-app 开发的微信小程序-小兔鲜儿电商项目

# 项目简介
微信小程序端：该项目包含了从首页浏览商品，到商品详情，微信登录，加入购物车，提交订单，微信支付，订单管理等功能。
当前仓库是 uni-app 开发的微信小程序端，通过条件编译能兼容 H5 端 和 App 端。

# 在线体验
![image](https://github.com/yuwenjun9420/uniapp-vue3-TS-Pina-shop/blob/master/readme/image/orpR85Z1uO0SFsTvCz_MwOZiEh74.jpg)

# 技术栈
前端框架:  uni-app (Vue3 + TS) <br>
状态管理： pinia <br>
组件库： uni-ui <br>

# 项目模块
* 首页模块
* 推荐模块
* 分类模块
* 详情模块
* 登录模块
* 用户模块
* 地址模块
* SKU 模块
* 购物车模块
* 订单模块

# 开发环境
**Windows 版本：** Windows 11 家庭中文版 <br>  
**开发工具：** VS Code 、 HbuilderX 、 微信开发者工具 <br>  
**Node 版本：** v14.23.0 <br>  

# 运行程序
## 1.安装依赖
```cnpm i```
## 2.运行
### 微信小程序端
```npm run dev:mp-weixin```

### H5端
```npm run dev:h5```

### App端
需 HbuilderX 工具，运行 - 运行到手机或模拟器

## 3.微信开发者工具导入 /dist/dev/mp-weixin 目录

# 项目结构

```├── .husky                     # Git Hooks
├── .vscode                    # VS Code 插件 + 设置
├── dist                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── components             # 全局组件
│   ├── composables            # 组合式函数
│   ├── pages                  # 主包页面
│       ├── index               # 首页
│       ├── category            # 分类页
│       ├── cart                # 购物车
│       ├── my                  # 我的
│       ├── goods               # 商品详情
│       └── hot                 # 热门推荐
│       └── login               # 登录页
│   ├── pagesMember            # 分包页面(用户模块)
│       ├── address             # 地址管理
│       ├── address-form        # 地址表单
│       ├── profile             # 用户信息
│       └── settings            # 用户设置
│   ├── pagesOrder             # 分包页面(订单模块)
│       ├── order              # 创建订单
│       ├── order-detail              # 订单详情
│       ├── order-list                # 订单列表
│       └── payment             # 支付结果
│   ├── services               # 所有请求
│   ├── static                 # 存放应用引用的本地静态资源的目录
│       ├── images              # 普通图片
│       └── tabs                # tabBar 图片
│   ├── stores                 # 全局 pinia store
│       ├── modules             # 模块
│       └── index.ts            # store 入口
│   ├── styles                 # 全局样式
│       └── fonts.scss          # 字体图标
│   ├── types                  # 类型声明文件
│   ├── utils                  # 全局方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
│   ├── pages.json             # 配置页面路由等页面类信息
│   ├── manifest.json          # 配置appid等打包信息
│   └── uni.scss               # uni-app 内置的常用样式变量
├── .eslintrc.cjs              # eslint 配置
├── .prettierrc.json           # prettier 配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
└── vite.config.ts             # vite 配置
```
