# [useThrottleFn](https://ahooks.js.org/zh-CN/hooks/use-throttle-fn#usethrottlefn)

## 📖 用法

用来处理节流函数的 Hook。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useThrottleFn/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useThrottleFn.ts]
import { throttle } from '../utils/lodash-polyfill'
import { useMemo } from 'react'
import type { ThrottleOptions } from '../useThrottle/throttleOptions'
import useLatest from '../useLatest'
import useUnmount from '../useUnmount'
import { isFunction } from '../utils'
import isDev from '../utils/isDev'
```

:::

## 🔍 解读
