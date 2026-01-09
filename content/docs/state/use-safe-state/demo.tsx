'use client'

import { useEffect, useState } from 'react'
import { useSafeState } from 'ahooks'

const Child = function () {
  const [value, setValue] = useSafeState<string>()

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server')
    }, 5000)
  }, [])

  const text = value || 'Loading...'

  return <div>{text}</div>
}

export default function Demo() {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? 'Unmount' : 'Mount'}</button>
      {visible && <Child />}
    </div>
  )
}
