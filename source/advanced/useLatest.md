# [useLatest](https://ahooks.js.org/zh-CN/hooks/use-latest#uselatest)

## 用法

<demo react="./useLatest.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useLatest/index.ts)

<!-- prettier-ignore -->
```js{4-7}
import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
```

## 解读

如果只有 `和`

使用 `useRef` 包装一层，并返回一个 `ref` 对象，确保每次获取的值都是最新的。
