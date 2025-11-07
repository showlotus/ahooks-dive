# [useDeepCompareLayoutEffect](https://ahooks.js.org/zh-CN/hooks/use-deep-compare-layout-effect#usedeepcomparelayouteffect)

## 📖 用法

用法与 `useLayoutEffect` 一致，不同的是，会深度比较依赖。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useDeepCompareLayoutEffect/index.tsx)

::: code-group

<!-- prettier-ignore -->
```ts [useDeepCompareLayoutEffect.ts]
import { useLayoutEffect } from 'react';
import { createDeepCompareEffect } from '../createDeepCompareEffect';

export default createDeepCompareEffect(useLayoutEffect);
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

关于 `createDeepCompareEffect` 的解读，可以查看对应文档：[useDeepCompareEffect](../../effect/use-deep-compare-effect/#🔍-解读)。
