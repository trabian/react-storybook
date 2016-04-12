'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeadHtml = getHeadHtml;
exports.readConfigFile = readConfigFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cjson = require('cjson');

var _cjson2 = _interopRequireDefault(_cjson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = console;

function getHeadHtml(configDirPath) {
  var headHtmlPath = _path2.default.resolve(configDirPath, 'head.html');
  var headHtml = '';
  if (_fs2.default.existsSync(headHtmlPath)) {
    headHtml = _fs2.default.readFileSync(headHtmlPath, 'utf8');
  }

  return headHtml;
}

function readConfigFile(configFilePath) {
  var config = {};

  if (_fs2.default.existsSync(configFilePath)) {
    var content = _fs2.default.readFileSync(configFilePath, 'utf8');
    try {
      config = _cjson2.default.parse(content);
    } catch (e) {
      logger.error('=> Error parsing .babelrc file: ' + e.message);
      throw e;
    }
  }

  return config;
}