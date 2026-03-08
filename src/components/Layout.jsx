import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from './ui/BottomNav.jsx'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen min-h-dvh bg-primary">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
