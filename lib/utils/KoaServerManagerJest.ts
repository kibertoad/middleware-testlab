import { Server } from 'net'
// @ts-ignore
import Application from 'koa'
import supertest, { SuperTest, Test } from 'supertest'

export class KoaServerManagerJest {
  private server: Server | undefined
  private readonly port: number

  public constructor(port?: number) {
    this.port = port || 8888
  }

  public request(): SuperTest<Test> {
    return supertest(this.server)
  }

  public start(app: Application, port?: number): void {
    this.stop()
    this.server = app.listen(port || this.port)
  }

  public startBeforeEach(app: Application, port?: number): void {
    beforeEach(() => {
      this.start(app, port)
    })
  }

  public startBeforeAll(app: Application, port?: number): void {
    beforeAll(() => {
      this.start(app, port)
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
