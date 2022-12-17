import { Request, Response } from 'express'

import { read, write } from '../services/image.service.js'

export const writeImage = (req: Request, res: Response) => {
  try {
    const { img } = req.body
    const { id } = req.query
    if (img && id) {
      const result = write(img, id as string)
      return res.json({ message: result })
    }
  } catch (e) {
    return res.status(500).json({ message: e ?? 'Error of writing' })
  }
}

export const readImage = (req: Request, res: Response) => {
  try {
    const { id } = req.query
    if (id) {
      const result = read(id as string)
      return res.json(result)
    }
  } catch (e) {
    return res.status(500).json({ message: 'You\'ve just started current session, so cashed value isn\'t exist for a while.' })
  }
}