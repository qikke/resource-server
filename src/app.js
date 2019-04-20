const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');

const server = http.createServer((req, res)=>{
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.write('<html><body><div style="color: red;">HELLO,</div></body></html>');
  res.end();
});

server.listen(conf.port, conf.hostname, ()=>{
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`Server started at ${chalk.green(addr)}`);
});

