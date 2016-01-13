# zGulp 项目构建配置

## 结构目录： ##

```javascript
├── dist    // 发布环境
│   ├── css
│   │    ├── main.css
│   │    └── main.min.css
│   ├── js
│   │    ├── main.js
│   │    └── main.min.js
│   └── index.html
│
├── src	  // 源文件
│   ├── sass
│   │    └── main.scss
│   ├── js
│   │    ├── a.js
│   │    └── b.js
│   └── index.html
├── .jshintrc     // jsHint 规则
├── gulpfile.js   // gulp 配置文件
└── package.json  // 项目信息文件
```

## 需要用到的插件 ##

- [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin)
- [gulp-sass](https://github.com/dlmanning/gulp-sass)
- [gulp-minify-css](https://github.com/murphydanger/gulp-minify-css)
- [gulp-jshint](https://github.com/spalger/gulp-jshint)
- [gulp-concat](https://github.com/contra/gulp-concat)
- [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
- [gulp-rename](https://github.com/hparra/gulp-rename)
- [gulp-clean](https://github.com/peter-vilja/gulp-clean)

## 注意事项 ##

每次需要执行默认任务时，请先执行 `gulp clean` 清除 dist 文件夹中的内容，防止执行默认任务时报错。