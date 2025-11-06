# [useUpdateEffect](https://ahooks.js.org/zh-CN/hooks/use-update-effect#useupdateeffect)

## 📖 用法

用法等同于 `useEffect`，但不同的是，会忽略首次执行，只在依赖更新时执行。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useUpdateEffect/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useUpdateEffect.ts]
import { useEffect } from 'react';
import { createUpdateEffect } from '../createUpdateEffect';

export default createUpdateEffect(useEffect);
```

<!-- prettier-ignore -->
```ts [createUpdateEffect.ts]
import { useRef } from 'react';
import type { useEffect, useLayoutEffect } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: EffectHookType) => EffectHookType =
  (hook) => (effect, deps) => {
    const isMounted = useRef(false);

    // for react-refresh
    hook(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    hook(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return effect();
      }
    }, deps);
  };

export default createUpdateEffect;`
```

:::

## 🔍 解读

首先，调用 `createUpdateEffect` 函数，传入 `useEffect` 函数。`createUpdateEffect` 函数接收一个函数作为参数，返回一个新函数。这样封装的目的是为了支持 `useLayoutEffect` 的用法。

把源码中的 `hook` 替换成 `useEffect`，再来看看实际的代码：

```ts
export const useUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false)

  // for react-refresh
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      return effect()
    }
  }, deps)
}
```
