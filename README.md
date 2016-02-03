# zGulp 利用 gulp 构建前端项目自动化工作流

## 结构目录： ##

```javascript
├── dev    // 开发环境
│   ├── css
│   │    └── main.css
│   ├── images
│   │    ├── 1.jpg
│   ├── js
│   │    ├── a.js
│   │    └── b.js
│   ├── lib
│   │    ├── jquery.min.js
│   │    └── zepto.min.js
│   └── index.html
├── publish	// 发布环境
│   ├── css
│   │    └── main.css	// 压缩后
│   ├── images
│   │    ├── 1.jpg		// 压缩后
│   ├── js
│   │    ├── main.js	// 压缩后
│   ├── lib
│   │    ├── jquery.min.js
│   │    └── zepto.min.js
│   └── index.html		// 压缩后
├── src	  // 源文件
│   ├── images
│   │    ├── 1.jpg
│   ├── js
│   │    ├── a.js
│   │    └── b.js
│   ├── lib
│   │    ├── jquery.min.js
│   │    └── zepto.min.js
│   ├── sass
│   │    └── main.scss
│   └── index.html
├── .jshintrc     // jsHint 规则
├── gulpfile.js   // gulp 配置文件
└── package.json  // 项目信息文件
```

## 功能模块 ##

### html 压缩（gulp-htmlmin） ###

压缩 html 代码。

### sass 预处理（gulp-sass） ###

将 sass 或 scss 文件转化为 css 文件。

### 检查 js 代码（gulp-jshint） ###

检查 javascript 代码是否规范。

### 合并 js（gulp-concat） ###

多个 javascript 文件合并成一个 javascript 文件。

### 压缩 js 代码（gulp-uglify） ###

压缩 javascript 代码。

### 文件清理（gulp-clean） ###

删除多余的文件及文件夹。

## 使用方法 ##

### 开发环境 ###

    gulp dev

### 发布环境 ###

    gulp publish