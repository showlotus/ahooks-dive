# [useScroll](https://ahooks.js.org/zh-CN/hooks/use-scroll#usescroll)

## 用法

监听元素的滚动事件。

<demo react="./use-scroll.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useScroll/index.ts)

::: code-group

```ts [useScroll.ts]
import { useEffect, useRef } from 'react'

const useScroll = () => {
  const ref = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      console.log('scroll')
    }
    ref.current.addEventListener('scroll', handleScroll)
    return () => {
      ref.current.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return ref
}

export default useScroll
```

:::

## 解读
