import path from 'path';
import fs from 'fs';
import cjson from 'cjson';

const logger = console;

export function getHeadHtml(configDirPath) {
  const headHtmlPath = path.resolve(configDirPath, 'head.html');
  let headHtml = '';
  if (fs.existsSync(headHtmlPath)) {
    headHtml = fs.readFileSync(headHtmlPath, 'utf8');
  }

  return headHtml;
}

export function readConfigFile(configFilePath) {
  let config = {};

  if (fs.existsSync(configFilePath)) {
    const content = fs.readFileSync(configFilePath, 'utf8');
    try {
      config = cjson.parse(content);
    } catch (e) {
      logger.error(`=> Error parsing .babelrc file: ${e.message}`);
      throw e;
    }
  }

  return config;
}
