import React, { useState, useEffect } from 'react'

export default () => {
  const [defaultCount, setDefaultCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDefaultCount(count => count + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <p>count(default): {defaultCount}</p>
    </>
  )
}
