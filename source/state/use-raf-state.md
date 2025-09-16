# [useRafState](https://ahooks.js.org/zh-CN/hooks/use-raf-state#userafstate)

## 用法

在 `requestAnimationFrame` 中更新状态。

<demo react="./use-raf-state.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useRafState/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useRafState.ts]
import { useCallback, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useUnmount from '../useUnmount';

function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useRafState<S>(initialState?: S | (() => S)) {
  const ref = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(ref.current);

    ref.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });

  return [state, setRafState] as const;
}

export default useRafState;
```

:::

## 解读
