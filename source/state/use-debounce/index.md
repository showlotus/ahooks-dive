# [useDebounce](https://ahooks.js.org/zh-CN/hooks/use-raf-state#userafstate)

## 📖 用法

用来处理防抖值的 Hook。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useDebounce/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useDebounce.ts]
import { useEffect, useState } from 'react';
import useDebounceFn from '../useDebounceFn';
import type { DebounceOptions } from './debounceOptions';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}

export default useDebounce;
```

:::

## 🔍 解读

::: tip
关于 `useDebounceFn`，可以查看对应文档：[useDebounceFn](../../effect/use-debounce-fn/)。
:::

<!-- prettier-ignore -->
```ts
function useDebounce<T>(value: T, options?: DebounceOptions) {
  // 1. 首先，使用 useState 定义了一个 debounced 状态，用于存储防抖后的值。
  const [debounced, setDebounced] = useState(value);

  // 2. 然后，使用 useDebounceFn 来定义一个防抖函数。
  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  // 3. 接着，使用 useEffect 来监听 value 的变化，并调用 run 函数执行防抖函数。
  useEffect(() => {
    run();
  }, [value]);

  // 4. 最后，返回防抖后的值。
  return debounced;
}
```
