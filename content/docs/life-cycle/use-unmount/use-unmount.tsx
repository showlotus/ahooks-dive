import React from 'react'
import { useUnmount, useBoolean } from 'ahooks'

const MyComponent = () => {
  useUnmount(() => {
    console.log('mount')
  })

  return <div>Hello World</div>
}

export default () => {
  const [state, { toggle }] = useBoolean(false)

  return (
    <>
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  )
}
