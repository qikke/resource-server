const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
const mime = require('./mime');

const tplPath = path.join(__dirname, '../template/dir.html');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = mime(filePath);
      res.statusCode = 200;
      res.setHeader('Content-type', contentType);
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      // find relative path
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files
      }
      res.end(template(data));
    }
  } catch (ex) {
    console.log(ex);
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.end(`${filePath} is not a directorty or file.\n${ex}`);
    return;
  }
}
