import { Server } from 'net'
// @ts-ignore
import Application from 'koa'
import supertest, { SuperTest, Test } from 'supertest'

export class KoaServerManagerMocha {
  private server: Server | undefined

  public request(): SuperTest<Test> {
    return supertest(this.server)
  }

  public startBeforeEach(app: Application, port: number = 8888): void {
    beforeEach(() => {
      this.stop()
      this.server = app.listen(port)
    })
  }

  public startBefore(app: Application, port: number = 8888): void {
    // @ts-ignore
    before(() => {
      this.stop()
      this.server = app.listen(port)
    })
  }

  public stopAfterEach(): void {
    afterEach(() => {
      this.stop()
    })
  }

  // afterAll for mocha
  public stopAfter(): void {
    // @ts-ignore
    after(() => {
      this.stop()
    })
  }

  private stop(): void {
    if (this.server) {
      this.server.close()
      this.server = undefined
    }
  }
}
