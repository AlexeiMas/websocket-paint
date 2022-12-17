import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getNameFromStorage } from '../features/sessionStorage'

export interface ICanvas {
  canvas: HTMLCanvasElement | null
  socket: WebSocket | null
  sessionId: string | null
  undoList: string[]
  redoList: string[]
  username: string
}

const initialState: ICanvas = {
  canvas: null,
  socket: null,
  sessionId: null,
  undoList: [],
  redoList: [],
  username: getNameFromStorage() ?? '',
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setSocket: (state, action: PayloadAction<WebSocket | null>) => {
      state.socket = action.payload
    },
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload
    },
    setCanvas: (state, action) => {
      state.canvas = action.payload
    },
    pushToUndo: (state, action) => {
      state.undoList.push(action.payload)
    },
    pushToRedo: (state, action) => {
      state.redoList.push(action.payload)
    },
    undo: (state) => {
      const { canvas } = state
      const ctx = canvas?.getContext('2d')

      if (state.undoList.length > 0) {
        const dataUrl = state.undoList.pop()
        if (dataUrl && canvas) {
          state.redoList.push(canvas.toDataURL())
          const img = new Image()
          img.src = dataUrl
          img.onload = () => {
            if (canvas && ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
          }
        }
      } else {
        if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    },
    redo: (state) => {
      const { canvas } = state
      const ctx = canvas?.getContext('2d')

      if (state.redoList.length > 0) {
        const dataUrl = state.redoList.pop()
        if (dataUrl && canvas) {
          state.undoList.push(canvas.toDataURL())
          const img = new Image()
          img.src = dataUrl
          img.onload = () => {
            if (canvas && ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
          }
        }
      }
    },
  },
})

export const {
  setUsername,
  setSocket,
  setSessionId,
  setCanvas,
  pushToUndo,
  pushToRedo,
  undo,
  redo,
} = canvasSlice.actions
export default canvasSlice.reducer