import React, { useState } from 'react'
import { useControllableValue } from 'ahooks'

function Input(props: { value?: string; onChange?: (value: string) => void }) {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: '',
  })

  return (
    <>
      <input
        value={state}
        onChange={e => setState(e.target.value)}
        style={{ width: 300 }}
      />
      <button
        type="button"
        onClick={() => setState('')}
        style={{ marginLeft: 8 }}
      >
        Clear By Self
      </button>
    </>
  )
}

export default () => {
  const [state, setState] = useState<string>('')
  const clear = () => {
    setState('')
  }

  return (
    <div>
      <div style={{ border: '1px dashed', padding: 10 }}>
        <div>非受控组件</div>
        <Input />
      </div>
      <div style={{ border: '1px dashed', padding: 10, marginTop: 10 }}>
        <div>受控组件</div>
        <Input value={state} onChange={setState} />
        <button style={{ marginLeft: 10 }} onClick={clear}>
          Clear By Parent
        </button>
      </div>
    </div>
  )
}
