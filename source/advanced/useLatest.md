# [useLatest](https://ahooks.js.org/zh-CN/hooks/use-latest#uselatest)

## 📖 用法

返回最新的值。

<demo react="./useLatest.tsx" />

为什么 `demo.tsx` 中为什么 `defaultCount` 没有更新？

这是一个典型的 React 闭包问题，由于 `useEffect` 在组件挂载后只会执行一次，且 `setInterval` 中的回调函数内部始终是对第一次初始化时的 `defaultCount` 进行引用，也就意味着 `setInterval` 的回调函数中获取到的 `defaultCount` 一直都是 `0`。

如果将 `setDefaultCount` 传入一个更新函数，那么就能解决这个问题。

::: code-group

```tsx [demo.tsx]
import React, { useState, useEffect } from 'react'

export default () => {
  const [defaultCount, setDefaultCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDefaultCount(count => count + 1) // [!code highlight]
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <p>count(default): {defaultCount}</p>
    </>
  )
}
```

:::

<demo react="./useLatest2.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useLatest/index.ts)

<!-- code-group start -->

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

:::

<!-- code-group end -->

## 🔍 解读

使用 `useRef` 定一个 `ref` 对象，并返回这个 `ref` 对象，确保每次获取的值都是最新的。相较于 `useRef`，多了一行赋值的代码。

::: code-group

<!-- prettier-ignore -->
```ts [useLatest.ts]
import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value; // [!code highlight]

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

因为使用 `useRef` 定义的变量，React 会记录在当前组件内部，在组件重新渲染时，不会再被初始化，而是使用当前组件内部记录的值。

而每次重新渲染时，当前组件内部上下文中拿到的都是每个 `state` 最新的值，`useLatest` 相当于更新了一下 `useRef` 定义的值，保证当前 `ref` 对象是最新的值。

![demo.tsx 更新流程](./useLatest.excalidraw.svg)
