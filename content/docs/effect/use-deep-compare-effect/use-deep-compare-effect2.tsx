import React, { useEffect, useState, useRef } from 'react'

export const useCustomCompareEffect = (effect, deps, isEqual = Object.is) => {
  const depsRef = useRef(undefined)
  const signalRef = useRef(0)
  if (deps === undefined || !isEqual(deps, depsRef.current)) {
    signalRef.current += 1
  }
  depsRef.current = deps
  useEffect(effect, [signalRef.current])
}

export default () => {
  const [count, setCount] = useState(0)
  const effectCountRef = useRef(0)
  const customCompareCountRef = useRef(0)

  useEffect(() => {
    effectCountRef.current += 1
  }, [{}])

  useCustomCompareEffect(
    () => {
      customCompareCountRef.current += 1
    },
    [customCompareCountRef.current],
    // 当大于等于 5 时，不再触发 effect
    (newDeps, oldDeps) => {
      return newDeps[0] >= 5
    }
  )

  return (
    <div>
      <p>effectCount: {effectCountRef.current}</p>
      <p>customCompareCount: {customCompareCountRef.current}</p>
      <p>
        <button type="button" onClick={() => setCount(c => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  )
}
