# rollup-plugin-postcss-inject-to-css

[![NPM version](https://img.shields.io/npm/v/rollup-plugin-postcss-inject-to-css.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-postcss-inject-to-css) [![NPM downloads](https://img.shields.io/npm/dm/rollup-plugin-postcss-inject-to-css.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-postcss-inject-to-css)

rollup-plugin-postcss的 `inject` 模式下，把导出后组件引用的xxx.scss.js转换为xxx.css进行引入

本插件依赖 [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) ，主要是针对**组件按需加载**的场景下进行的优化适配

# Install

npm:
```
npm install -D rollup-plugin-postcss-inject-to-css
```
yarn:
```
yarn add -D rollup-plugin-postcss-inject-to-css
```

# Usage

```
// rollup.config.js

import RollPostcss from 'rollup-plugin-postcss'
import RollPostcssInject2Css from 'rollup-plugin-postcss-inject-to-css'

export default {
  input,
  output,
  plugins: [
    RollPostcss({
      extract: false, // 非导出模式
      inject: true,  // 内联模式
      plugins: []
    }),
    RollPostcssInject2Css()
  ]
}
```

## Demo

### 痛点：

rollup-plugin-postcss在打包的时候，打包出来的css如果选择`extract`模式，会把所有样式都打包到一个入口文件下，若选择`inject`模式，则是通过把组件样式都嵌入到`<style>`标签里。

`extract`的问题：不方便进行组件模块的css按需加载
`inject`的问题：样式内联在`<style>`标签下，权重会比`<link>`引入的高，不符合组件的设计逻辑

### 解决问题：

在实现**按需加载**的时候，除了组件的js代码需要按需加载，**样式文件**同样需要，采用rollup的`output.preserveModules`搭配[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)插件即可实现组件按需加载

### 实例：

```
├── packages （组件目录）
│   ├── componentA （组件A）
│   │   ├── index.js 
│   │   └── index.scss 
│   ├── componentB （组件B）
│   │   ├── index.js 
│   │   └── index.scss 
```

- `extract` 模式下 编译后：====>
```
├── packages （组件目录）
│   ├── componentA （组件A）
│   │   ├── index.js 
│   ├── componentB （组件B）
│   │   ├── index.js 
│   ├── index.css （入口样式文件 包括A和B）
```

- `inject` 模式下 编译后：====>
```
├── packages （组件目录）
│   ├── componentA （组件A）
│   │   ├── index.js (组件引入样式import './index.scss.js')
│   │   └── index.scss.js
│   ├── componentB （组件B）
│   │   ├── index.js 
│   │   └── index.scss.js
```

-  使用了`rollup-plugin-postcss-inject-to-css`的`inject`模式 编译后：====>
```
├── packages （组件目录）
│   ├── componentA （组件A）
│   │   ├── index.js  (组件引入样式import './index.css')
│   │   └── index.css
│   ├── componentB （组件B）
│   │   ├── index.js 
│   │   └── index.css
```
