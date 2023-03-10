/**
 * @file svg2ttf
 * @author junmer
 */

/* eslint-env node */

const isSvg = require('is-svg');
const through = require('through2');
const { TTFWriter } = require('fonteditor-core');
const { svg2ttfobject } = require('fonteditor-core');
const { ab2b } = require('b3b');
const replaceExt = require('replace-ext');
const _ = require('lodash');

/**
 * svg2ttf fontmin plugin
 *
 * @param {Object} opts opts
 * @return {Object} stream.Transform instance
 * @api public
 */
module.exports = function (opts) {
  opts = _.extend({ clone: true, hinting: true }, opts);

  return through.ctor(
    {
      objectMode: true,
    },
    function (file, enc, cb) {
      // check null
      if (file.isNull()) {
        cb(null, file);
        return;
      }

      // check stream
      if (file.isStream()) {
        cb(new Error('Streaming is not supported'));
        return;
      }

      // check svg
      if (!isSvg(file.contents)) {
        cb(null, file);
        return;
      }

      // clone
      if (opts.clone) {
        this.push(file.clone(false));
      }

      // replace ext
      file.path = replaceExt(file.path, '.ttf');

      // ttf buffer
      let output;

      try {
        const ttfObj = svg2ttfobject(file.contents.toString('utf-8'));

        output = ab2b(new TTFWriter(opts).write(ttfObj));
      } catch (ex) {
        cb(ex);
      }

      if (output) {
        file.contents = output;
        cb(null, file);
      }
    },
  );
};
