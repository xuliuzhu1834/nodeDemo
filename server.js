#!/usr/bin/env node
/**
 * Created by brook on 2016/10/18.
 * server on port 9000
 */


const express = require('express');

const app = express();
module.exports = app;

const spider = require('./src/spiders');

app.use(express.static('./web'));

app.get('/', (req, res) => res.sendFile(`${__dirname}/web/index.html`));
console.log('web path:',`${__dirname}/web/index.html`);

spider(app);

const server = app.listen(9000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


