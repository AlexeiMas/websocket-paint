import { useState, useEffect } from 'react'

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const useCanvasSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    const handleResize = () => {
      if (window.screen.orientation !== undefined) {
        const w = document.documentElement.clientWidth
        const h = document.documentElement.clientHeight
        setWindowSize({
          width: Math.floor(w - (w / 100) * 10),
          height: Math.floor(h - (h / 100) * 20),
        })
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}