import WebSocket from 'ws'
import { ISocketData } from '../types/index.js'

export const connectionHandler = (ws: WebSocket & { id?: string }, msg: ISocketData, clients: Set<WebSocket & { id?: string }>) => {
  ws.id = msg.id
  broadcastConnection(ws, msg, clients)
}

export const broadcastConnection = (ws: WebSocket, msg: ISocketData, clients: Set<WebSocket & { id?: string }>) => {
  clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg))
    }
  })
}