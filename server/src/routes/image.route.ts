import { readImage, writeImage } from '../controllers/image.controller.js'

import Router from 'express'

const router = Router()

router.post('/', writeImage)
router.get('/', readImage)


export default router