# [useUpdateLayoutEffect](https://ahooks.js.org/zh-CN/hooks/use-update-layout-effect#useupdatelayouteffect)

## 📖 用法

用法与 `useLayoutEffect` 一致，不同的是，会忽略首次执行，只在依赖更新时执行。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useUpdateLayoutEffect/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useUpdateLayoutEffect.ts]
import { useLayoutEffect } from 'react';
import { createUpdateEffect } from '../createUpdateEffect';

export default createUpdateEffect(useLayoutEffect);
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

export default createUpdateEffect;
```

:::

## 🔍 解读

关于 `createUpdateEffect` 的解读，可以查看对应文档：[useUpdateEffect](../../effect/use-update-effect/#🔍-解读)。
