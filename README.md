```
.
│  .gitignore  # Git忽略文件配置
│  androidPrivacy.json  # Android隐私设置
│  app.config.js  # 应用配置
│  App.vue  # Vue主应用组件
│  changelog.md  # 项目更改日志
│  env.js  # 环境变量配置
│  index.html  # HTML入口文件
│  LICENSE  # 开源协议
│  main.js  # 应用的主入口
│  manifest.json  # PWA的Web应用清单文件
│  package-lock.json  # npm的依赖树
│  package.json  # npm的包配置文件
│  pages.json  # 应用页面配置
│  README.md  # 项目说明文件
│  tsconfig.json  # TypeScript的配置文件
│  uni-starter.config.js  # uni-app配置文件
│  uni.scss  # 全局的scss样式文件
│  vite.config.js  # Vite构建工具配置
│  
├─.hbuilderx  # HBuilderX编辑器的配置目录
│      launch.json  
│      
├─api  # 封装API和请求拦截器的目录
│  │  index.ts  
│  │  
│  ├─interceptors  # 请求拦截器目录
│  │      index.ts  
│  │      request-interceptor.ts  # 请求拦截器
│  │      response-interceptor.ts  # 响应拦截器
│  │      
│  └─todos  # 待办事项的API目录
│          index.ts  
│          
├─common  # 存放一些通用模块的目录
│  │  appInit.js  # 应用初始化模块
│  │  openApp.js  # 应用打开模块
│  │  
│  └─function  # 存放通用函数的目录
│          myPubFunction.js  # 通用函数文件
│          
├─components  # 存放项目组件的目录
│  ├─base  # 存放基础组件的目录
│  │      base.vue  # 基础组件
│  │      
│  ├─custom  # 存放自定义组件的目录
│  │      custom.vue  # 自定义组件
│  │      
│  ├─layout  # 存放布局组件的目录
│  ├─refreshBox  # 存放刷新盒子组件的目录
│  │      refreshBox.nvue  # 刷新盒子组件
│  │      
│  └─uni-load-state  # 存放uni-app加载状态组件的目录
│      │  readme.md  
│      │  uni-load-state.vue  # 加载状态组件
│      │  
│      └─i18n  # 加载状态组件的国际化目录
│              en.json  # 英文翻译
│              index.js  # 国际化配置文件
│              zh-Hans.json  # 简体中文翻译
│              
├─lang  # 存放国际化文件的目录
│      en.js  # 英文翻译
│      i18n.js  # 国际化配置文件
│      zh-Hans.js  # 简体中文翻译
│            
├─pages  # 存放页面的目录
│  ├─circle  # 存放"circle"页面的目录
│  │      index.vue  # "circle"页面文件
│  │      
│  ├─grid  # 存放"grid"页面的目录
│  │      grid.vue  # "grid"页面文件
│  │      
│  ├─home  # 存放"home"页面的目录
│  │      index.test.js  # "home"页面的测试文件
│  │      index.vue  # "home"页面文件
│  │      
│  ├─list  # 存放"list"页面的目录
│  │  │  detail.vue  # "list"页面的详情文件
│  │  │  list.nvue  # "list"页面文件
│  │  │  
│  │  └─search  # 存放"list"页面的搜索模块的目录
│  │          search.nvue  # "list"页面的搜索模块文件
│  │          
│  ├─my  # 存放"my"页面的目录
│  │      index.vue  # "my"页面文件
│  │      
│  ├─practice  # 存放"practice"页面的目录
│  │      index.vue  # "practice"页面文件
│  │      
│  ├─ucenter  # 存放"user center"页面的目录
│  │  │  ucenter.vue  # "user center"页面文件
│  │  │  
│  │  ├─about  # 存放"user center"页面的关于模块的目录
│  │  │      about.vue  # "user center"页面的关于模块文件
│  │  │      
│  │  ├─invite  # 存放"user center"页面的邀请模块的目录
│  │  │      invite.vue  # "user center"页面的邀请模块文件
│  │  │      
│  │  ├─read-news-log  # 存放"user center"页面的阅读新闻日志模块的目录
│  │  │      read-news-log.vue  # "user center"页面的阅读新闻日志模块文件
│  │  │      
│  │  └─settings  # 存放"user center"页面的设置模块的目录
│  │      │  settings.vue  # "user center"页面的设置模块文件
│  │      │  
│  │      └─dc-push  # 存放"user center"页面的设置模块的推送子模块的目录
│  │              push.js  # "user center"页面的设置模块的推送子模块文件
│  │     
│  └─uni-agree  # 存放 "uni-agree" 页面的目录
│      │  uni-agree.nvue  # "uni-agree" 页面文件
│      │  
│      └─utils  # 存放 "uni-agree" 页面的工具函数目录
│              uni-agree.js  # "uni-agree" 页面的工具函数文件
│              
├─pages_template  # 存放页面模板的目录
│  └─...  # 各种页面模板目录
│          
├─plugins  # 插件目录
│      index.js  # 插件主入口
│      uni.promisify.adaptor.ts  # uni-app promisify 适配器
│      
├─static  # 静态资源目录
│  └─...  # 各种静态资源目录和文件
│          
├─stores  # Vuex Store目录
│  │  index.ts  # Vuex Store主入口
│  │  pinia-persist-plugin.ts  # Pinia持久化插件
│  │  
│  └─modules  # Vuex Store模块目录
│          counter.ts  # 计数器模块
│          
├─styles  # 样式目录
│      common.scss  # 通用样式
│      index.scss  # 样式主入口
│      mixins.scss  # Sass混合样式
│      utilities.scss  # 工具类样式
│      variables.scss  # Sass变量
│      
├─sub_packages  # 分包目录
│  └─auth  # 认证分包目录
│      ├─pages  # 认证页面目录
│      └─services  # 认证服务目录
│              authService.ts  # 认证服务
│              
├─types  # TypeScript类型定义目录
│      api.d.ts  # API类型定义
│      global.d.ts  # 全局类型定义
│      router.d.ts  # 路由类型定义
│      uview-plus.d.ts  # uView插件的类型定义
│                        
└─utils  # 工具函数目录
    ├─api  # API工具目录
    ├─date  # 日期处理工具目录
    ├─helper  # 辅助工具目录
    ├─toast  # Toast提示工具目录
    └─validation  # 验证工具目录
```