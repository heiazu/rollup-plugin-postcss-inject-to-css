import path from 'path'
import commonjs from 'rollup-plugin-commonjs' // commonjs模块转换插件
import packageJSON from './package.json'
const getPath = _path => path.resolve(__dirname, _path)

// 基础配置
const commonConf = {
  input: getPath('./src/index.js'),
  plugins: [
    commonjs(),
  ]
}

// 需要导出的模块类型
const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: 'cjs',
    exports: 'named'
  },
  {
    file: packageJSON.module, // es6模块
    format: 'esm'
  }
]

const buildConf = options => Object.assign({}, commonConf, options)

export default outputMap.map(output => buildConf({
  output: {
    name: packageJSON.name,
    sourcemap: true,
    ...output
  }
}))
