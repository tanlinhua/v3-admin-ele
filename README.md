# v3-admin-ele

## 环境依赖
基于 
[vite3.x](https://vitejs.cn) + 
[vue3.x](https://cn.vuejs.org) + 
[element-plus](https://element-plus.gitee.io/zh-CN) 
的
[JavaScript版](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Overview)
后台管理系统模板

npm -g i [pnpm](https://pnpm.io/zh/motivation)

Vite need [Node.js](https://nodejs.org/zh-cn/) 16+

部分设计参考了 [vue3-admin-plus](https://github.com/jzfai/vue3-admin-plus)

## 安装运行

```bash
cd v3-admin-ele
pnpm i # 安装
pnpm run dev # 运行
pnpm run build # 打包

pnpm run preview # 预览生产环境
pnpm run lint # 代码格式检查并自动修复
```

## pnpm
node_modules/.modules.yaml在项目中打开该文件。

它将包含一个名为“store”的字段，其中包含用于将包硬链接到您的项目的商店的位置。

