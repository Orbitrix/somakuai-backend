import { Request, Response, NextFunction } from 'express'

const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date()
  const date = now.toLocaleDateString('en-GB')
  const time = now.toLocaleTimeString('en-GB')

  console.log(`[${date} ${time}] ${req.method} ${req.path}`)

  res.on('finish', () => {
    console.log(
      `[${date} ${time}] ${req.method} ${req.path} - ${res.statusCode} ${res.statusMessage}`
    )
  })

  next()
}

export default logger