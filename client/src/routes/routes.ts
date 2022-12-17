import CanvasLayout from '../layouts/CanvasLayout'

export type TRoutes = {
  path: string
  Component: () => JSX.Element
}

export const routes: TRoutes[] = [
  {
    path: '/:id',
    Component: CanvasLayout,
  },
]