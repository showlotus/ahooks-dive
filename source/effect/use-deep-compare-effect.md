# [useDeepCompareEffect](https://ahooks.js.org/zh-CN/hooks/use-deep-compare-effect)

## 📖 用法

深度比较依赖，只有在依赖发生变化时才会执行回调函数。

<demo react="./use-deep-compare-effect.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useDeepCompareEffect/index.tsx)

::: code-group

<!-- prettier-ignore -->
```tsx [useDeepCompareEffect.tsx]
import { useEffect } from 'react';
import { createDeepCompareEffect } from '../createDeepCompareEffect';

export default createDeepCompareEffect(useEffect);
```

<!-- prettier-ignore -->
```ts [createDeepCompareEffect.ts]
import { useRef } from 'react';
import type { DependencyList, useEffect, useLayoutEffect } from 'react';
import { depsEqual } from '../utils/depsEqual';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
  const ref = useRef<DependencyList>(undefined);
  const signalRef = useRef<number>(0);
  if (deps === undefined || !depsEqual(deps, ref.current)) {
    signalRef.current += 1;
  }
  ref.current = deps;
  hook(effect, [signalRef.current]);
};
```

<!-- prettier-ignore -->
```ts [depsEqual.ts]
import type { DependencyList } from 'react';
import isEqual from 'react-fast-compare';

export const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) =>
  isEqual(aDeps, bDeps);
```

:::

## 🔍 解读

_TODO_
