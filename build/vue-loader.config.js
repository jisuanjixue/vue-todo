module.exports = (isDev) => {
  return {
    preserveWhitepace: true,     //vue模板里，清除多余的空格（因为多余的空格会渲染到页面上，不太好）
    extractCSS: !isDev, // 将vue里的css单独打包成一个文件（这项设置，看个人需要）
    cssModules: {
      // localIdentName: '[path]-[name]-[hash:base64:5]',
      camelCase: true
    }
  }
}