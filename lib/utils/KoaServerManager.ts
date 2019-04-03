import { Server } from 'net'
// @ts-ignore
import Application from 'koa'

export class KoaServerManager {
  private server: Server | undefined

  public startBeforeEach(app: Application, port: number = 8888): void {
    beforeEach(() => {
      this.stop()
      this.server = app.listen(port)
    })
  }

  public startBeforeAll(app: Application, port: number = 8888): void {
    beforeEach(() => {
      this.stop()
      this.server = app.listen(port)
    })
  }

  public stopAfterEach(): void {
    afterEach(() => {
      this.stop()
    })
  }

  public stopAfterAll(): void {
    afterAll(() => {
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
