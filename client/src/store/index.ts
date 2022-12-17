import { configureStore } from '@reduxjs/toolkit'
import toolReducer from './toolSlice'
import canvasReducer from './canvasSlice'

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    canvas: canvasReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch