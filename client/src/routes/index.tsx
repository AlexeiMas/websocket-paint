import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }) =>
          <Route key={path} path={path} element={<Component />} />,
        )}
        <Route path={'*'} element={<Navigate to={`f${(+new Date()).toString(16)}`} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router