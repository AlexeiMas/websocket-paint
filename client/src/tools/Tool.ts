export default class Tool {
  constructor(canvas: HTMLCanvasElement, socket?: WebSocket, id?: string) {
    this.canvas = canvas
    this.socket = socket
    this.id = id
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  canvas: HTMLCanvasElement
  socket?: WebSocket
  id?: string
  ctx: CanvasRenderingContext2D | null

  set fillColor(color: CanvasColor['fillColor']) {
    if (this.ctx) {
      this.ctx.fillStyle = color
    }
  }

  set strokeColor(color: CanvasColor['fillColor']) {
    console.log('Stroke color')
    if (this.ctx) {
      this.ctx.strokeStyle = color
    }
  }

  set lineWidth(width: number) {
    if (this.ctx) {
      this.ctx.lineWidth = width
    }
  }

  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
  }
}