import React, { MutableRefObject, useEffect, useRef } from 'react'
import '../styles/toolbar.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setLineWidth, setStrokeColor } from '../store/toolSlice'
import Eraser from '../tools/Eraser'

const SettingBar = () => {
  const { tool } = useAppSelector(state => state.tool)
  const dispatch = useAppDispatch()
  const strokeColorRef = useRef() as MutableRefObject<HTMLInputElement>

  useEffect(() => {
    if (!(tool instanceof Eraser) && tool?.ctx && strokeColorRef.current.value !== tool.ctx.strokeStyle) {
      dispatch(setStrokeColor(strokeColorRef.current.value))
    }
  }, [tool, dispatch])

  return (
    <div className={'settingBar'}>
      <label htmlFor='line-width'>Line width:</label>
      <input
        id='line-width'
        type='number'
        onChange={(e) => dispatch(setLineWidth(Number(e.target.value)))}
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor='stroke-color'>Stroke color:</label>
      <input
        ref={strokeColorRef}
        id='stroke-color'
        type='color'
        onChange={(e) => dispatch(setStrokeColor(e.target.value))}
      />
    </div>
  )
}

export default SettingBar