import { config } from 'dotenv'

config()

import express from 'express'
import expressWs from 'express-ws'

const { app, getWss } = expressWs(express())
const aWss = getWss()
import cors from 'cors'
import routes from './routes/index.js'

import { wsHandler } from './controllers/ws.controller.js'

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1', routes)
app.ws('/api/v1/ws', wsHandler.bind(aWss))

app.listen(PORT, () => {
  console.log(`Server was started on PORT ${PORT}...`)
})
