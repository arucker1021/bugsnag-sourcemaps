'use strict'

const dirname = require('path').dirname
const unlinkSync = require('graceful-fs').unlinkSync
const rmdir = require('graceful-fs').rmdir

/**
 * Removes temporary files generated by the upload process.
 *
 * @param {object} options The options
 * @returns {Promise<object>}
 */
module.exports = function cleanupTempFiles (options) {
  return new Promise((resolve, reject) => {
    if (options.tempDir) {
      if (dirname(options.sourceMap) === options.tempDir) {
        unlinkSync(options.sourceMap)
      }
      rmdir(options.tempDir, (err) => {
        if (err && err.code !== 'ENOTEMPTY') {
          reject(err)
        } else {
          resolve()
        };
      })
    } else {
      resolve()
    }
  })
}