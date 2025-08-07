# [useLatest](https://ahooks.js.org/zh-CN/hooks/use-latest#uselatest)

## 用法

<demo react="./useLatest.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useLatest/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useLatest.ts]
import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
```

```tsx [demo.tsx]
import React, { useState, useEffect, useRef } from 'react'
import { useLatest } from 'ahooks'

export default () => {
  const [useLatestCount, setUseLatestCount] = useState(0)
  const [defaultCount, setDefaultCount] = useState(0)

  const latestCountRef = useLatest(useLatestCount)

  useEffect(() => {
    const interval = setInterval(() => {
      setUseLatestCount(latestCountRef.current + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDefaultCount(defaultCount + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <p>count(useLatest): {useLatestCount}</p>
      <p>count(default): {defaultCount}</p>
    </>
  )
}
```

:::

## 解读

相较于 `useRef`，多了一行赋值的代码。

<!-- prettier-ignore -->
```ts{5} [useLatest.ts]
import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value; 

  return ref;
}

export default useLatest;
```

那直接在 `demo.tsx` 使用 `useRef` 实现。

```tsx [demo.tsx]
import React, { useState, useEffect, useRef } from 'react'
import { useLatest } from 'ahooks'

export default () => {
  const [useLatestCount, setUseLatestCount] = useState(0)
  const [defaultCount, setDefaultCount] = useState(0)

  const latestCountRef = useLatest(useLatestCount) // [!code --]
  const latestCountRef = useRef(useLatestCount) // [!code ++]
  latestCountRef.current = useLatestCount // [!code ++]

  useEffect(() => {
    const interval = setInterval(() => {
      setUseLatestCount(latestCountRef.current + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDefaultCount(defaultCount + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <p>count(useLatest): {useLatestCount}</p>
      <p>count(default): {defaultCount}</p>
    </>
  )
}
```

使用 `useRef` 包装一层，并返回一个 `ref` 对象，确保每次获取的值都是最新的。
