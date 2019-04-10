# cors-breaker

1. 安装 node 环境

2. `npm install`
3. 修改 `index.js` 中的 `TARGET_HOST ` 为你想要转发的地址
4. `node index.js`
5. 服务启动后，即可通过该服务地址（默认端口：3030）来访问 `TARGET_HOST ` 上的接口；



### 同源策略

同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。而想要读取不同源下的资源就是一种跨域操作。对这种跨域行为，浏览器是拒绝的。CORS 是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing），提供了跨域解决方案，用来避开浏览器的同源策略。



CORS 标准中使用了以下三个请求头来限制浏览器的访问：

```
Access-Control-Allow-Origin  // 允许的域

Access-Control-Allow-Headers // 运行的请求头，如：Content-Type, ...

Access-Control-Allow-Methods // 允许的方法，如 GET, POST, OPTIONS
```

浏览器会首先发出一个 OPTIONS 预检请求，以检测实际请求是否可以被服务器所接受，服务端则会返回带上述三个头的 response。浏览器会检查这次请求的 Origin, Method, Headers 是否在允许列表中，如果不存在，则会报错。



### 原理

由于我们在调试网页的时候，往往可能存在去请求一些测试链接，而 web 部署的服务和服务端很可能不同源，造成测试麻烦。



由于同源策略只在浏览器中有限制，而服务端并没有，所以我们可以在本地启动一个服务，做一下转发，然后在中间层去掉 CORS 的那几个限制。这样你就可以访问任何非同域下的接口了，这就是本段小代码解决的东西。



