const { describe, it, beforeEach, afterEach } = global;
import { expect } from 'chai';
import { getHeadHtml, readConfigFile } from '../utils';
import mock from 'mock-fs';

const HEAD_HTML_CONTENTS = '<script>console.log("custom script!");</script>';

describe('server.getHeadHtml', () => {
  describe('when .storybook/head.html does not exist', () => {
    beforeEach(() => {
      mock({
        config: {},
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('return an empty string', () => {
      const result = getHeadHtml('./config');
      expect(result).to.be.equal('');
    });
  });

  describe('when .storybook/head.html exists', () => {
    beforeEach(() => {
      mock({
        config: {
          'head.html': HEAD_HTML_CONTENTS,
        },
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('return the contents of the file', () => {
      const result = getHeadHtml('./config');
      expect(result).to.be.equal(HEAD_HTML_CONTENTS);
    });
  });
});

describe('readConfigFile', () => {
  describe('when config file does node exist', () => {
    beforeEach(() => {
      mock({
        config: {},
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should return an empty object', () => {
      const result = readConfigFile('./config/test-config.cjson');
      expect(result).to.deep.equal({});
    });
  });

  describe('when config file exists', () => {
    beforeEach(() => {
      mock({
        config: {
          'test-config.cjson': `{
            "someConfig": "value",
            "number": 100
          }`,
        },
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should return the config as a js object', () => {
      const result = readConfigFile('./config/test-config.cjson');
      expect(result).to.deep.equal({
        number: 100,
        someConfig: 'value',
      });
    });
  });
});
