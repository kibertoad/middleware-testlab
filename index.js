const { newKoaApp, DEFAULT_ENDPOINT } = require('./dist/lib/apps/koaApp')
const { newExpressApp } = require('./dist/lib/apps/expressApp')

const { KoaServerManagerJest } = require('./dist/lib/utils/KoaServerManagerJest')
const { KoaServerManagerMocha } = require('./dist/lib/utils/KoaServerManagerMocha')

const { okHandler: okHandlerKoa } = require('./dist/lib/handlers/commonHandlersKoa')
const { okHandler: okHandlerExpress, throwingHandler: throwingHandlerExpress } = require('./dist/lib/handlers/commonHandlersExpress')

const handlers = {
  koa: {
    okHandler: okHandlerKoa
  },
  express: {
    okHandler: okHandlerExpress,
    throwingHandler: throwingHandlerExpress
  }
}

module.exports = {
  handlers,
  newExpressApp,
  newKoaApp,
  KoaServerManagerJest,
  KoaServerManagerMocha,
  DEFAULT_ENDPOINT
}
