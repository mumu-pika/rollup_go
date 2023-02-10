// import { log } from './logger'
// import message from './message'

// import _ from 'lodash-es' // 导入第三方模块依赖lodash-es
// import cjs from './cjs-module' // 导入commonjs语法的模块

// // 在使用了rollup-plugin-json插件之后
// import { name, description } from '../package.json'
// // 使用模块成员
// const msg = message.hi
// log(msg)
// log(name)
// log(description)
// log(_.camelCase('Hello world'))
// log(cjs)



// code splitting 代码分割
import('./logger').then(({log}) => {
  log('code splitting')
})
