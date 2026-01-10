'use client'

import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, options?: { wait: number }) {
  const wait = options?.wait ?? 1000
  const [debouncedValue, setDebouncedValue] = useState(value)
  let timer: NodeJS.Timeout
  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      setDebouncedValue(value)
    }, wait)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [value, wait])
  return debouncedValue
}

export default function Demo() {
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounce(value, { wait: 500 })

  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>Value: {value}</p>
      <p style={{ marginTop: 16 }}>DebouncedValue（延时 500ms 后更新）: {debouncedValue}</p>
    </div>
  )
}
