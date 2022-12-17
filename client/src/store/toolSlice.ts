import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tool from '../tools/Tool'

interface ITool {
  tool: Tool | null
}

const initialState: ITool = {
  tool: null,
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload
    },
    setFillColor: (state, action: PayloadAction<CanvasColor['fillColor']>) => {
      state.tool && (state.tool.fillColor = action.payload)
    },
    setStrokeColor: (state, action: PayloadAction<CanvasColor['strokeColor']>) => {
      state.tool && (state.tool.strokeColor = action.payload)
    },
    setLineWidth: (state, action: PayloadAction<CanvasColor['lineWidth']>) => {
      state.tool && (state.tool.lineWidth = action.payload)
    },
  },
})

export const { setTool, setFillColor, setStrokeColor, setLineWidth } = toolSlice.actions
export default toolSlice.reducer
