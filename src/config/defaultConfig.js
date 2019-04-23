const path = require('path');

module.exports = {
  hostname: '127.0.0.1',
  port: 9527,
  root: path.resolve('./'),
  // 需要压缩的文件格式
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 300,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
};
