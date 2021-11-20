# 插件
```
export default {
  //修改vite的配置
  config() {},
  //vite配置确认
  configResolved() {},
  //用于配置dev server
  configureServer() {},
  //用于转换宿主页
  transformIndexHtml() {},
  //创建自定义确认函数，常用语定位第三方依赖
  resolved() {},
  //创建自定义确认函数，可用于返回自定义的内容
  load() {},
  //用于转换已加载的模块内容
  transform(code, id) {
  },
  //自定义HMR更新时调用
  handleHotUpdate() {},
};
```