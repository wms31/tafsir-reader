import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import SplashScreen from '../pages/SplashScreen.jsx'
import HomePage from '../pages/HomePage.jsx'
import CollectionPage from '../pages/CollectionPage.jsx'
import ReaderPage from '../pages/ReaderPage.jsx'
import BookmarksPage from '../pages/BookmarksPage.jsx'
import SettingsPage from '../pages/SettingsPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/collection/:collectionId',
        element: <CollectionPage />,
      },
      {
        path: '/bookmarks',
        element: <BookmarksPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '/reader/:collectionId/:bookId',
    element: <ReaderPage />,
  },
])
