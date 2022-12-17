import Brush from './Brush'

export default class Eraser extends Brush {
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
  }

  draw(x: number, y: number) {
    if (this.ctx) {
      this.ctx.strokeStyle = 'white'
    }
    this.ctx?.lineTo(x, y)
    this.ctx?.stroke()

  }
}