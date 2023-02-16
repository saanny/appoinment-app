import { InversifyExpressServer } from 'inversify-express-utils'

import { container } from '../../di-container'

class App {
  public port: number

  constructor(port: number) {
    this.port = port
  }

  public start(): void {
    const server = new InversifyExpressServer(container)

    server.setConfig((app) => {
      // boot(app);
    })

    // server.setErrorConfig((app) => {

    // });
    const app = server.build()

    app.listen(this.port, () => {
      console.log(`app is running on port ${this.port}`)
    })
  }
}

export default App
