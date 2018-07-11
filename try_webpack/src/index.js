// 文件引用，按照此顺序打包文件
require('./style.less')
require('./styles/normalize')
require('./styles/index')
// 封装 log
const { log } = require('./utils')

const format = require('utils/format')

log(format('hello webpack'))

document.querySelector('.superman').style.display = 'block'

log(_.map([1, 2, 3], item => item * 2))