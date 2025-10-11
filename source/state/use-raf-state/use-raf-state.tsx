import { useRafState } from 'ahooks'
import React, { useEffect, useState } from 'react'

const WithUseState = ({ times = 1 }) => {
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
    <div style={{ color: '#F44336' }}>
      [WithUseState] update state count: {state} / {times}
    </div>
  )
}

const WithUseRafState = ({ times = 1 }) => {
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
    <div style={{ color: '#4CAF50' }}>
      [WithUseRafState] update state count: {state} / {times}
    </div>
  )
}

export default () => {
  return (
    <div>
      滚动页面，观察两个组件更新次数的差异
      <WithUseState times={1} />
      <WithUseRafState times={1} />
      <hr />
      <WithUseState times={10} />
      <WithUseRafState times={10} />
    </div>
  )
}
