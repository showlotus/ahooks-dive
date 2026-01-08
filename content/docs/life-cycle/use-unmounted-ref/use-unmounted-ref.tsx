import React, { useEffect, useState } from 'react'
import { useUnmountedRef } from 'ahooks'

const MyComponent = () => {
  const unmountedRef = useUnmountedRef()
  useEffect(() => {
    setTimeout(() => {
      if (!unmountedRef.current) {
        console.log('component is alive')
      } else {
        console.log('component is unmounted')
      }
    }, 3000)
  }, [])

  return <p>Hello World!</p>
}

export default () => {
  const [state, setState] = useState(true)

  return (
    <>
      <button type="button" onClick={() => setState(!state)}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  )
}
