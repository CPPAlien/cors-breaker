const Koa = require('koa');
const app = new Koa();
const request = require('request');

const TARGET_HOST = 'http://alpha.kujiale.com';

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  // 你的自定义请求头，需要添加在其中
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set('Access-Control-Allow-Methods', '*');
  await next();
});

app.use(async (ctx, next) => {
  const path = ctx.request.url;
  const headers = JSON.parse(JSON.stringify(ctx.request.header));
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200;
    return;
  }

  const req = {
    headers: headers,
    uri: `${TARGET_HOST}${path}`,
    method: ctx.request.method,
  };

  await new Promise((resolve) => {
    request(req, async (error, response, body) => {
      ctx.response.status = response.statusCode;
      ctx.response.body = response.body;
      ctx.response.header = response.headers;
      resolve();
    });
  });
});

app.listen(3030);