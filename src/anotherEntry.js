// 这里来实践多入口文件, 是作为除了index.js之外的第二个入口文件
import fetchApi from './fetch'
import { log } from './logger'


fetchApi('/todos/1').then(data => log(data))