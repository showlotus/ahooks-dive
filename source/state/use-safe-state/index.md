# [useSafeState](https://ahooks.js.org/zh-CN/hooks/use-safe-state)

## 📖 用法

组件卸载后，不再更新状态。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useSafeState/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useSafeState.ts]
import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useUnmountedRef from '../useUnmountedRef';

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((currentState: S) => {
    /** if component is unmounted, stop update */
    if (unmountedRef.current) {
      return;
    }
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const;
}

export default useSafeState;
```

:::

::: tip
关于 `useUnmountedRef`，可以查看对应文档：[useUnmountedRef](../../life-cycle/use-unmounted-ref/)。
:::

## 🔍 解读

内部使用 `useUnmountedRef` 来判断组件是否已经卸载，如果已经卸载，则不进行更新。

<!-- prettier-ignore -->
```ts
function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef(); // [!code focus:1]
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((currentState: S) => {
    /** if component is unmounted, stop update */
    if (unmountedRef.current) { // [!code focus:3]
      return;
    }
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const;
}
```

内部定义 `setCurrentState` 作为更新函数，并使用 `useCallback` 缓存函数引用，避免重复创建函数，导致重渲染。

<!-- prettier-ignore -->
```ts
function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((currentState: S) => { // [!code focus:7]
    /** if component is unmounted, stop update */
    if (unmountedRef.current) {
      return;
    }
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const;
}
```
