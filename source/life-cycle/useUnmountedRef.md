# [useUnmountedRef](https://ahooks.js.org/zh-CN/hooks/use-unmounted-ref#useunmountedref)

## 用法

当前组件是否已经卸载。

<demo react="./useUnmountedRef.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useUnmountedRef/index.tsx)

::: code-group

<!-- prettier-ignore -->
```tsx [useUnmountedRef.tsx]
import { useEffect, useRef } from 'react';

const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

export default useUnmountedRef;
```

:::

## 解读

使用 `useRef` 记录当前组件的卸载状态，初始值为 `false`，挂载时赋值为 `false`，卸载时赋值为 `true`，最后返回当前 `ref` 对象，用于判断组件是否已经卸载。
