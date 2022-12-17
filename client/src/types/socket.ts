export interface ISocketData {
  id: string,
  username: string,
  method: 'connection' | 'draw',
  figure?: {
    type: string,
    x: number,
    y: number,
    width?: number,
    height?: number,
    color?: string | CanvasGradient | CanvasPattern
  }
}