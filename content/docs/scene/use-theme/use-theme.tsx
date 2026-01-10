'use client'

import { useEffect } from 'react'
import { useTheme } from 'ahooks'

export default function Demo() {
  const { theme, themeMode, setThemeMode } = useTheme({
    localStorageKey: 'themeMode',
  })

  // 更新当前站点主题
  const updateTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    if (themeMode === 'system') {
      updateTheme(theme)
    } else {
      updateTheme(themeMode)
    }
  }, [theme, themeMode])

  return (
    <>
      <div>theme: {theme}</div>
      <div>themeMode: {themeMode}</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={() => {
            setThemeMode('dark')
          }}
        >
          use dark theme
        </button>
        <button
          type="button"
          onClick={() => {
            setThemeMode('light')
          }}
        >
          use light theme
        </button>
        <button
          type="button"
          onClick={() => {
            setThemeMode('system')
          }}
        >
          follow the system
        </button>
      </div>
    </>
  )
}
