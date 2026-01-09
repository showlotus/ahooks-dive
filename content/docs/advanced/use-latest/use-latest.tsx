'use client'

import { useState, useEffect } from 'react'
import { useLatest } from 'ahooks'

export default function UseLatestDemo() {
  const [useLatestCount, setUseLatestCount] = useState(0)
  const [defaultCount, setDefaultCount] = useState(0)

  const latestCountRef = useLatest(useLatestCount)

  useEffect(() => {
    const interval = setInterval(() => {
      setUseLatestCount(latestCountRef.current + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDefaultCount(defaultCount + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <p>count(useLatest): {useLatestCount}</p>
      <p>count(default): {defaultCount}</p>
    </>
  )
}
