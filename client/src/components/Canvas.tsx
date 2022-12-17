import React, { useEffect, useRef, useState } from 'react'
import '../styles/canvas.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { pushToUndo, setCanvas, setSessionId, setSocket, setUsername } from '../store/canvasSlice'
import { setTool } from '../store/toolSlice'
import Brush from '../tools/Brush'
import ModalView from './ModalView'
import { useParams } from 'react-router-dom'
import { ISocketData } from '../types/socket'
import Rect from '../tools/Rect'
import axios from 'axios'
import { useCanvasSize } from '../hooks/useCanvasSize'
import { setNameToStorage } from '../features/sessionStorage'

const Canvas = () => {
  const { username } = useAppSelector(state => state.canvas)
  const dispatch = useAppDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null) //as MutableRefObject<HTMLCanvasElement>
  const [modal, setModal] = useState<boolean>(true)
  const { id } = useParams<{ id?: string }>()
  const canvasSize = useCanvasSize()

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL
    if (canvasRef.current) {
      dispatch(setCanvas(canvasRef.current))
      const ctx = canvasRef.current.getContext('2d')
      axios.get(`${apiUrl}/image?id=${id}`)
        .then(response => {
          const img = new Image()
          img.src = response.data
          img.onload = () => {
            if (ctx && canvasRef.current) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
              ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
              ctx.stroke()
            }
          }
        })
        .catch(e => console.log(e.response.data.message))
    }
  }, [id, dispatch])

  useEffect(() => {
    const wsServer = process.env.REACT_APP_WS_URL
    if (username && wsServer) {
      const socket = new WebSocket(wsServer)
      dispatch(setSocket(socket))
      id && dispatch(setSessionId(id))
      canvasRef.current && id && dispatch(setTool(new Brush(canvasRef.current, socket, id)))
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id,
          username,
          method: 'connection',
        } as ISocketData))
      }
      socket.onmessage = (e) => {
        let msg: ISocketData = JSON.parse(e.data)
        switch (msg.method) {
          case 'connection':
            console.log(`User ${msg.username} connected`)
            break
          case 'draw':
            drawHandler(msg)
            break
        }
      }
    }
  }, [username, id, dispatch])

  const drawHandler = (msg: ISocketData) => {
    const figure = msg.figure
    const ctx = canvasRef.current?.getContext('2d')
    if (figure && ctx) {
      switch (figure!.type) {
        case 'brush':
          Brush.draw(ctx, figure.x, figure.y)
          break
        case 'rect':
          (figure.width && figure.height && figure.color) &&
          Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
          break
        case 'finish':
          ctx.beginPath()
          break
      }
    }
  }

  const mouseUpHandler = () => {
    const apiUrl = process.env.REACT_APP_API_URL
    if (apiUrl && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // change non-opaque pixels to white
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 255) {
            data[i] = 255
            data[i + 1] = 255
            data[i + 2] = 255
            data[i + 3] = 255
          }
        }
        ctx.putImageData(imgData, 0, 0)
      }

      dispatch(pushToUndo(canvas.toDataURL('image/jpeg', 1.0)))
      axios.post(`${apiUrl}/image?id=${id}`, { img: canvas.toDataURL('image/jpeg', 1.0) })
        .then(response => console.log(response.data))
    }
  }

  const modalHandler = (name: string) => {
    setNameToStorage(name)
    dispatch(setUsername(name))
    setModal(false)
  }

  return (
    <div className={'canvas'}>
      {username === '' && <ModalView show={modal} handler={modalHandler} />}
      <canvas onMouseUp={() => mouseUpHandler()} ref={canvasRef} {...canvasSize} />
    </div>
  )
}

export default Canvas