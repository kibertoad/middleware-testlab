import { newKoaApp, DEFAULT_ENDPOINT } from './lib/apps/koaApp'
import { newExpressApp } from './lib/apps/expressApp'

import { KoaServerManagerJest } from './lib/utils/KoaServerManagerJest'
import { KoaServerManagerMocha } from './lib/utils/KoaServerManagerMocha'

import { okHandler as okHandlerKoa } from './lib/handlers/commonHandlersKoa'
import { okHandler as okHandlerExpress } from './lib/handlers/commonHandlersExpress'

const handlers = {
  koa: {
    okHandler: okHandlerKoa
  },
  express: {
    okHandler: okHandlerExpress
  }
}

export { handlers, newKoaApp, newExpressApp, KoaServerManagerJest, KoaServerManagerMocha, DEFAULT_ENDPOINT }
