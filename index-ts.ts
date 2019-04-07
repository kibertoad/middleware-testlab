import { newKoaApp, DEFAULT_ENDPOINT } from './lib/apps/koaApp'
import { newExpressApp } from './lib/apps/expressApp'

import { KoaServerManagerJest } from './lib/utils/KoaServerManagerJest'
import { KoaServerManagerMocha } from './lib/utils/KoaServerManagerMocha'

import { okHandler as okHandlerKoa } from './lib/handlers/commonHandlersKoa'
import { okHandler as okHandlerExpress, throwingHandler as throwingHandlerExpress } from './lib/handlers/commonHandlersExpress'

const handlers = {
  koa: {
    okHandler: okHandlerKoa
  },
  express: {
    okHandler: okHandlerExpress,
    throwingHandler: throwingHandlerExpress
  }
}

export { handlers, newKoaApp, newExpressApp, KoaServerManagerJest, KoaServerManagerMocha, DEFAULT_ENDPOINT }
