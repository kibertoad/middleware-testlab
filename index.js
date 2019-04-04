const { newKoaApp, DEFAULT_ENDPOINT } = require('./dist/lib/apps/koaApp')
const { newExpressApp } = require('./dist/lib/apps/expressApp')

module.exports = {
  newExpressApp,
  newKoaApp,
  DEFAULT_ENDPOINT
}
