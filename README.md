### 前言
rollup 的相关实践，加深对打包工具的理解。

### 1、起步
#### 安装rollup依赖
``` bash
yarn add rollup -D
```

#### 以iife的格式输出指定的打包的文件
``` bash
yarn rollup ./src/index.js --format iife
```

#### 此外还能指定打包输出的路径
``` bash
yarn rollup ./src/index.js --format iife --file dist/bundle.js
```
> 打包输出的内容中, 不会包含未引用到的部分，这是因为rolLup 会默认开启tree-shaking

#### rollup配置文件
在项目根目录下新建rollup.config.js
需要加上--config, 因为默认是不会读取配置文件
``` bash
yarn rollup --config rollup.config.js
```

### 2、rollup 扩展 （使用插件扩展）
* `@rollup/plugin-json`
* `@rollup/plugin-node-resolve`
* `@rollup/plugin-commonjs`
* `@rollup/plugin-terser`

#### @rollup/plugin-json
> 允许 rollup 从一个 JSON 文件中导入数据

#### @rollup/plugin-node-resolve
rollup 默认只能按照文件路径去加载本地的文件模块, 那么对于npm上的第三方的模块是没法像webpack那样直接去通过模块的名称去导入对应的模块。那么为了消除这个不足点，可以使用`@rollup/plugin-node-resolve`这个插件，通过使用这个插件，可以在模块中使用名称去导入对应的模块了。

#### @rollup/plugin-commonjs
rollup默认处理的是es模块打包，那么如果在代码中导入或使用commonjs模块，rollup默认是没法支持的，对于目前大量npm模块导出的是commonjs模块的情况，为了兼容和导入这些模块，可以使用`@rollup/plugin-commonjs`这个插件。

#### @rollup/plugin-terser
>压缩rollup打包输出后的文件
需要注意的是，像`@rollup/plugin-terser`这类插件是在Rollup 的主要代码分析完成之后，才可以修改代码

### 3、rollup代码分割
 Rollup 有很多场景自动将代码分割成块，例如动态加载或者多入口。
 ``` javascript 将静态加载改为动态加载
// src/main.js
export default function () {
  import('./foo.js').then(({ default: foo }) => console.log(foo));
}
 ```

### 4、rollup多入口打包
```javascript
// input: 'src/index.js', // 打包的入口文件路径
input: ['src/index.js', 'src/anotherEntry.js'],
// 多入口打包路径
// 多入口打包, 内部会自动提取公共模块，内部会使用代码拆分, 因此代码输出格式不能是iife和umd
// 指定输出的相关配置

// 多入口打包还可以写成对象的形式
input: {
  'bundle1': 'src/index.js',
  'bundle2': 'src/anotherEntry.js'
}
```

对于amd这种输出格式的js文件，我们不能直接去引用到页面上，而必须要去通过实现amd标准的库去加载，比如借助于requirejs这个库来加载amd模块。

### 5、rollup本身的一些特点
* 输出扁平
* 自动移除未使用的代码
* 打包结果依然完全可读
* 加载非ESM的模块相对复杂, 需要配置一系列插件
* 模块最终都被打包到一个函数中, 无法实现HMR
* 浏览器环境中, 代码拆分功能依赖AMD库
* webpack大而全, rollup小而美