import { useState, useEffect } from 'react'

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if already installed as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Detect iOS
    const ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
    setIsIOS(ios)

    // Listen for Chrome/Edge beforeinstallprompt event
    const handler = e => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!installPrompt) return false
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
      setInstallPrompt(null)
    }
    return outcome === 'accepted'
  }

  return { installPrompt, install, isInstalled, isIOS }
}
