import React, { useState } from 'react'
import { Moon, Sun, Download, Smartphone, ChevronRight, Globe, Sparkles } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode.js'
import { usePWAInstall } from '../hooks/usePWAInstall.js'
import { storage } from '../services/storage.js'

function Toggle({ enabled }) {
  return (
    <div
      className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ backgroundColor: enabled ? 'var(--color-accent)' : 'var(--color-bg-elevated)' }}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </div>
  )
}

function SettingRow({ icon: Icon, label, description, right, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-4 text-left transition-colors duration-150"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--color-accent-muted)' }}
      >
        <Icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {label}
        </p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {description}
          </p>
        )}
      </div>
      {right}
    </button>
  )
}

function SectionHeader({ title }) {
  return (
    <div className="px-4 py-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
        {title}
      </p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
      <SectionHeader title={title} />
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const { isDark, toggle } = useDarkMode()
  const { installPrompt, install, isInstalled, isIOS } = usePWAInstall()

  const [flipAnimation, setFlipAnimation] = useState(() => {
    const saved = storage.get('pageFlipAnimation')
    return saved !== null ? saved : true
  })

  const toggleFlip = () => {
    setFlipAnimation(prev => {
      storage.set('pageFlipAnimation', !prev)
      return !prev
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <header className="px-5 pt-14 pb-6 safe-area-top">
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Settings
        </h1>
      </header>

      <div className="px-5 pb-8 space-y-4">

        {/* Appearance */}
        <Section title="Appearance">
          <SettingRow
            icon={isDark ? Moon : Sun}
            label="Dark Mode"
            description={isDark ? 'Currently using dark theme' : 'Currently using light theme'}
            right={<Toggle enabled={isDark} />}
            onClick={toggle}
          />
        </Section>

        {/* Reading */}
        <Section title="Reading">
          <SettingRow
            icon={Sparkles}
            label="Page Flip Animation"
            description={flipAnimation ? 'Animated page transitions on' : 'Animated page transitions off'}
            right={<Toggle enabled={flipAnimation} />}
            onClick={toggleFlip}
          />
        </Section>

        {/* Install */}
        <Section title="Install App">
          {isInstalled ? (
            <div className="px-4 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-accent-muted)' }}>
                <Smartphone className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>App Installed</p>
                <p className="text-xs" style={{ color: 'var(--color-accent)' }}>Running as installed PWA ✓</p>
              </div>
            </div>
          ) : (
            <>
              {installPrompt && (
                <SettingRow
                  icon={Download}
                  label="Install on Device"
                  description="Add to home screen for offline access"
                  right={<ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />}
                  onClick={install}
                />
              )}
              {isIOS && (
                <div className="px-4 py-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-accent-muted)' }}>
                    <Smartphone className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      Install on iPhone/iPad
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Tap the Share button in Safari, then select "Add to Home Screen".
                    </p>
                  </div>
                </div>
              )}
              {!installPrompt && !isIOS && (
                <div className="px-4 py-4">
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Open in Chrome on Android or Safari on iOS to install.
                  </p>
                </div>
              )}
            </>
          )}
        </Section>

        {/* Coming Soon */}
        <Section title="Coming Soon">
          <SettingRow
            icon={Globe}
            label="Language"
            description="English (more languages coming soon)"
            right={
              <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}>
                Soon
              </span>
            }
            onClick={() => {}}
          />
        </Section>

        {/* About */}
        <Section title="About">
          <div className="px-4 py-4">
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Tafsir Reader
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              A free, ad-free Islamic commentary reading app. Built with the intention of making
              classical Islamic scholarship more accessible.
            </p>
            <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>Version 1.0.0</p>
          </div>
        </Section>

      </div>
    </div>
  )
}
