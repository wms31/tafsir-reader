import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.jsx'
import { DarkModeProvider } from './context/DarkModeContext.jsx'

export default function App() {
  return (
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  )
}
