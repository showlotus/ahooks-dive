'use client'

import { useRef } from 'react'
import { useHover } from 'ahooks'

export default function Demo() {
  const ref = useRef(null)
  const isHovering = useHover(ref)
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>
}
