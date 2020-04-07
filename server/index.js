require('./models');

const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const mongoose = require('mongoose');

const config = require('./config');
const router = require('./routes');

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

mongoose.connect(config.db, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
}).then(() => {
  console.log("Database connected, listening on port 8000");
  app.listen(8000);
});
