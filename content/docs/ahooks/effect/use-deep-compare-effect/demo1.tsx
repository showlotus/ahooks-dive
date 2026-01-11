'use client'

import { useUpdate } from 'ahooks'

export default function Demo() {
  const update = useUpdate()

  return (
    <>
      <div>Time: {new Date().toISOString()}</div>
      <button type="button" onClick={update} style={{ marginTop: 8 }}>
        update
      </button>
    </>
  )
}
