import { useEffect, useRef, useState } from 'react'

type Subscription<T> = (val: T) => void

class MultiEventEmitter<T> {
  private subscriptions = new Map<string, Set<Subscription<T>>>()

  emit(eventName: string, val: T) {
    if (!this.subscriptions.has(eventName)) {
      return
    }

    const subscriptions = this.subscriptions.get(eventName)!
    for (const subscription of subscriptions) {
      subscription(val)
    }
  }

  useSubscription(eventName: string, callback: Subscription<T>) {
    const callbackRef = useRef<Subscription<T>>(undefined)
    callbackRef.current = callback
    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.current) {
          callbackRef.current(val)
        }
      }
      if (this.subscriptions.has(eventName)) {
        this.subscriptions.get(eventName)!.add(subscription)
      } else {
        this.subscriptions.set(eventName, new Set([subscription]))
      }
      return () => {
        this.subscriptions.get(eventName)?.delete(subscription)
      }
    }, [])
  }
}

function useMultiEventEmitter<T>() {
  const ref = useRef<MultiEventEmitter<T>>(undefined)
  if (!ref.current) {
    ref.current = new MultiEventEmitter()
  }
  return ref.current
}

function Child1({
  multiEventEmitter,
}: {
  multiEventEmitter: MultiEventEmitter<string>
}) {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  multiEventEmitter.useSubscription('chat-to-child1', message => {
    setMessages(prev => [...prev, message])
  })
  return (
    <div>
      Child1
      <div>
        <input
          style={{ width: '100%' }}
          type="text"
          placeholder="Enter message to send to Child2"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              multiEventEmitter.emit(
                'chat-to-child2',
                `Child1: ${inputMessage}`
              )
              setInputMessage('')
            }
          }}
        />
      </div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}

function Child2({
  multiEventEmitter,
}: {
  multiEventEmitter: MultiEventEmitter<string>
}) {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  multiEventEmitter.useSubscription('chat-to-child2', (message: string) => {
    setMessages((prev: string[]) => [...prev, message])
  })
  return (
    <div>
      Child2
      <div>
        <input
          type="text"
          style={{ width: '100%' }}
          placeholder="Enter message to send to Child1"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              multiEventEmitter.emit(
                'chat-to-child1',
                `Child2: ${inputMessage}`
              )
              setInputMessage('')
            }
          }}
        />
      </div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}

export default function () {
  const multiEventEmitter = useMultiEventEmitter<string>()
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
      }}
    >
      <Child1 multiEventEmitter={multiEventEmitter} />
      <Child2 multiEventEmitter={multiEventEmitter} />
    </div>
  )
}
