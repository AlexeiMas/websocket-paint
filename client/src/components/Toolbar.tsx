import React, { ChangeEvent } from 'react'
import '../styles/toolbar.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFillColor, setStrokeColor, setTool } from '../store/toolSlice'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import { redo, undo } from '../store/canvasSlice'

const Toolbar = () => {
  const { canvas, socket, sessionId } = useAppSelector(state => state.canvas)
  const dispatch = useAppDispatch()

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStrokeColor(e.target.value))
    dispatch(setFillColor(e.target.value))
  }

  const download = () => {
    const dataUrl = canvas?.toDataURL()
    const a = document.createElement('a')
    if (dataUrl) {
      a.href = dataUrl
      a.download = sessionId + '.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className={'toolbar'}>
      <button className={'toolbar__btn brush'}
              onClick={() => (canvas && socket && sessionId) && dispatch(setTool(new Brush(canvas, socket, sessionId)))}></button>
      <button className={'toolbar__btn rect'}
              onClick={() => (canvas && socket && sessionId) && dispatch(setTool(new Rect(canvas, socket, sessionId)))}></button>
      <button className={'toolbar__btn circle'}
              onClick={() => canvas && dispatch(setTool(new Circle(canvas)))}></button>
      <button className={'toolbar__btn eraser'}
              onClick={() => canvas && dispatch(setTool(new Eraser(canvas)))}></button>
      <button className={'toolbar__btn line'} onClick={() => canvas && dispatch(setTool(new Line(canvas)))}></button>
      <input onChange={(e) => changeColor(e)} type='color' className={'palette'} />
      <button className={'toolbar__btn undo'} onClick={() => dispatch(undo())}></button>
      <button className={'toolbar__btn redo'} onClick={() => dispatch(redo())}></button>
      <button className={'toolbar__btn save'} onClick={() => download()}></button>
    </div>
  )
}

export default Toolbar