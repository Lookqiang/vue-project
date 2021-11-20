const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
const path = require("path");
const compilerSFC = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");

//response
app.use((ctx) => {
  const { url, query } = ctx.request;
  let document = null;
  //url === '/' 首页请求
  if (url === "/") {
    ctx.type = "text/html";
    document = fs.readFileSync(path.join(__dirname, "./index.html"), "utf-8");
    ctx.body = document;
  } else if (url.endsWith(".js")) {
    //处理js文件
    const p = path.join(__dirname, url);
    ctx.type = "application/javascript";
    ctx.body = rewireImport(fs.readFileSync(p, "utf-8"));
  } else if (url.startsWith("/@modules/")) {
    //处理裸模块
    //裸模块名称
    const modulesName = url.replace("/@modules/", "");
    //到node_modules文件夹中寻找 模块
    const prefix = path.join(__dirname, "../node_modules", modulesName);
    //package.json 中获取modules字段
    const module = require(prefix + "/package.json").module;
    const filePath = path.join(prefix, module);
    const ret = fs.readFileSync(filePath, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewireImport(ret);
  } else if (url.indexOf(".vue") > -1) {
    //sfc（单文件组件）请求
    //读取vue文件，解析成js
    const p = path.join(__dirname, url.split("?")[0]);
    const ret = compilerSFC.parse(fs.readFileSync(p, "utf-8"));

    if (!query.type) {
      //获取脚本内容script内容
      const scriptContent = ret.descriptor.script.content;
      //替换默认导出为一个常量，方便后续修改
      const script = scriptContent.replace("export default", "const __script = ");
      ctx.type = "application/javascript";
      ctx.body = `
        ${rewireImport(script)}
        //处理style
        import '${url}?type=styles'
        //解析tpl
        import {render as __render } from '${url}?type=template';
        __script.render = __render;
        export default __script;
    `;
    } else if (query.type === "template") {
      const tpl = ret.descriptor.template.content;
      //编译为render
      const render = compilerDom.compile(tpl, { mode: "module" }).code;
      ctx.type = "application/javascript";
      ctx.body = rewireImport(render);
    } else if (query.type === "styles") {
      //获取样式内容
      const styleContent = ret.descriptor.styles[0].content;
      console.log(ret.descriptor.styles[0].content);
      if (styleContent) {
        ctx.type = "application/javascript";
        ctx.body = `
          const style = document.createElement("style");
          style.setAttribute("type", "text/css");
          style.innerHTML =  \`${styleContent}\`;
          document.head.appendChild(style);`;
      }
    }
  }
});

//重写裸模块
function rewireImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, function (s1, s2) {
    if (s2.startsWith("./") || s2.startsWith("/") || s2.startsWith("../")) {
      return s1;
    } else {
      return ` from '/@modules/${s2}'`;
    }
  });
}
app.listen(3001, () => {
  console.log("kvite start");
});
