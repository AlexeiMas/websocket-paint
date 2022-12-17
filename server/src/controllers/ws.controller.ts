import WebSocket, { WebSocketServer } from 'ws'

import { broadcastConnection, connectionHandler } from '../services/ws.service.js'
import { ISocketData } from '../types/index.js'

export function wsHandler(this: WebSocketServer, ws: WebSocket & { id?: string }) {
  const { clients } = this

  ws.on('message', (msg: ISocketData | string) => {
    msg = JSON.parse(msg as string) as ISocketData
    switch (msg.method) {
      case 'connection':
        connectionHandler(ws, msg, clients)
        break
      case 'draw':
        broadcastConnection(ws, msg, clients)
        break
    }
  })
}
