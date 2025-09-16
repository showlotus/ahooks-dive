import { useRafState } from 'ahooks'
import React, { useEffect, useState } from 'react'

const ChildOne = ({ times = 1 }) => {
  const [state, setState] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      for (let i = 0; i < times; i++) {
        setState(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div>
      ChildOne update state count: {state} / {times}
    </div>
  )
}

const ChildTwo = ({ times = 1 }) => {
  const [state, setState] = useRafState(0)
  useEffect(() => {
    const onScroll = () => {
      for (let i = 0; i < times; i++) {
        setState(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div>
      ChildTwo update state count: {state} / {times}
    </div>
  )
}
export default () => {
  return (
    <div>
      滚动页面，观察两个组件更新次数的差异
      <ChildOne times={1} />
      <ChildTwo times={1} />
      <hr />
      <ChildOne times={10} />
      <ChildTwo times={10} />
    </div>
  )
}
