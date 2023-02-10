import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve' // 用于可以以名称的方式导入npm第三方模块
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js', // 打包的入口文件路径
  // 指定输出的相关配置
  output: [
    // {
    //   file: 'dist/bundle.js', // 指定输出的文件名
    //   format: 'umd', // 指定输出的格式
    // },
    // {
    //   file: 'dist/bundle.min.js',
    //   format: 'iife',
    //   plugins: [terser()]
    // }

    // 下面需要采用代码分割
    // 需要配置output.dir才行
    {
      dir: 'dist',
      name:'bundle',
      format: 'cjs'
    }
  ],
  plugins: [json(), resolve(), commonjs()],
}
