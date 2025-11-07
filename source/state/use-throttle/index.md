# [useThrottle](https://ahooks.js.org/zh-CN/hooks/use-throttle#usethrottle)

## 📖 用法

用来处理节流值的 Hook。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useThrottle/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useThrottle.ts]
import { useEffect, useState } from 'react';
import useThrottleFn from '../useThrottleFn';
import type { ThrottleOptions } from './throttleOptions';

function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
}

export default useThrottle;
```
:::

## 🔍 解读

::: tip
关于 `useThrottleFn`，可以查看对应文档：[useThrottleFn](../../effect/use-throttle-fn/)。
:::

<!-- prettier-ignore -->
```ts
function useThrottle<T>(value: T, options?: ThrottleOptions) {
  // 1. 首先，使用 useState 定义了一个 throttled 状态，用于存储节流后的值。
  const [throttled, setThrottled] = useState(value);

  // 2. 然后，使用 useThrottleFn 来定义一个节流函数。
  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  // 3. 接着，使用 useEffect 来监听 value 的变化，并调用 run 函数执行节流函数。
  useEffect(() => {
    run();
  }, [value]);

  // 4. 最后，返回节流后的值。
  return throttled;
}
```