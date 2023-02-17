import { Request, Response } from 'express'

class HelloWorldController {
  async default(req: Request, res: Response): Promise<void> {
    res.status(200).send({ ok: 'ok' })

    return
  }
}

export { HelloWorldController }
