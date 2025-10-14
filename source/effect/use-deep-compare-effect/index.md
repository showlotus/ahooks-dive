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

首先调用 `createDeepCompareEffect` 函数，传入 `useEffect` 函数。

`createDeepCompareEffect` 执行后返回一个新函数。源码的写法有些简略，因为直接通过箭头函数返回一个新函数，所以就直接省略了 `return` 和 `{}`。

实际等同于下面的写法：

<!-- prettier-ignore -->
```ts
export const createDeepCompareEffect: CreateUpdateEffect = (hook) => {
  return (effect, deps) => {
    const ref = useRef<DependencyList>(undefined);
    const signalRef = useRef<number>(0);
    if (deps === undefined || !depsEqual(deps, ref.current)) {
      signalRef.current += 1;
    }
    ref.current = deps;
    hook(effect, [signalRef.current]);
  }
};
```

在解读 `createDeepCompareEffect` 函数之前，先来思考一个问题：如何实现一个可以自定义比较 `deps` 的 `useEffect` 的 `hook`？

首先肯定还是要在 `useEffect` 的基础上实现这个 `hook`。而由于 `useEffect` 只接受两个参数，第一个参数 `effect` 是回调函数，第二个参数 `deps` 是依赖数组。`effect` 肯定是不能变的，那就只能变 `deps` 了。那么可以将自定义比较的结果通过 `deps` 直接传给 `useEffect`，如果比较的结果为 `false` 时，那就触发 `effect`。

所以需要一个参数用来传给 `useEffect`，并且当比较结果为 `false` 时，这个参数能与上次的值不同。

那么简单点就是将这个参数设置为自增的，每当比较结果为 `false` 时，就自增 `1`。同时用 `useRef` 记录每次比较的结果。

而每次传入的 `deps` 同样也需要用 `useRef` 记录，用于每次比较时，判断 `deps` 是否发生变化。

所以，最后实现的代码如下：

<!-- prettier-ignore -->
```ts
import { useEffect, useRef } from 'react';

export const useCustomCompareEffect = (effect, deps, isEqual = Object.is) => {
  const depsRef = useRef(undefined);
  const signalRef = useRef(0);
  if (deps === undefined || !isEqual(deps, depsRef.current)) {
    signalRef.current += 1;
  }
  depsRef.current = deps;
  useEffect(effect, [signalRef.current]);
};
```

`useCustomCompareEffect` 函数接收三个参数：`effect` 是回调函数，`deps` 是依赖数组，`isEqual` 是自定义比较函数。

如果 `isEqual` 未传入，则默认使用 `Object.is` 进行比较。并且当前的执行逻辑与 `useEffect` 一致。

函数内部将 `depsRef` 的初始值设置为 `undefined`，因为 `useEffect` 的 `deps` 是可选的。如果未传入，则需要每次渲染时都触发 `effect`。

再将 `signalRef` 的初始值设置为 `0`，用于后续自增。

接着判断 `deps` 是否为 `undefined`，或者是否与上次记录的 `deps` 不一致，如果不一致，则自增 `signalRef`。

然后更新 `depsRef` 的值为当前最新的 `deps`。

最后将 `signalRef` 的值作为 `deps` 传给 `useEffect`，用于触发 `effect`。

小测一下～

<demo react="./use-deep-compare-effect2.tsx" />

了解了 `useCustomCompareEffect` 的实现后，这时候再看 `createDeepCompareEffect` 的实现，一切都豁然开朗了。

无非就是在 `createDeepCompareEffect` 内部默认用 `react-fast-compare` 的 `isEqual` 来比较 `deps` 是否发生变化。其余部分与 `useCustomCompareEffect` 一致。

<!-- prettier-ignore -->
```ts
export const createDeepCompareEffect: CreateUpdateEffect = (hook) => {
  return (effect, deps) => {
    const ref = useRef<DependencyList>(undefined);
    const signalRef = useRef<number>(0);
    if (deps === undefined || !depsEqual(deps, ref.current)) { // [!code highlight]
      signalRef.current += 1;
    }
    ref.current = deps;
    hook(effect, [signalRef.current]);
  }
};
```

关于 `react-fast-compare` 的性能，与其他常用库对比了一下：

```bash{7,13,19,25,31}
 ✓ performance/isEqual.bench.ts (20) 30022ms
   ✓ isEqual primitives (4) 12722ms
     name                                  hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · es-toolkit/isEqual          5,570,330.33  0.0001  1.6825  0.0002  0.0002  0.0003  0.0003  0.0009  ±1.23%  2785166
   · es-toolkit/compat/isEqual   6,036,394.12  0.0001  4.6306  0.0002  0.0002  0.0003  0.0003  0.0005  ±3.60%  3018198
   · lodash/isEqual             13,391,214.96  0.0001  1.9242  0.0001  0.0001  0.0001  0.0002  0.0003  ±1.45%  6695608   fastest
   · react-fast-compare            862,318.72  0.0008  0.7540  0.0012  0.0010  0.0024  0.0025  0.0170  ±0.54%   431160   slowest
   ✓ isEqual dates (4) 3825ms
     name                                 hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · es-toolkit/isEqual         1,138,553.87  0.0007  0.4236  0.0009  0.0008  0.0016  0.0018  0.0252  ±0.63%   569291   fastest
   · es-toolkit/compat/isEqual  1,001,027.09  0.0007  1.2038  0.0010  0.0008  0.0017  0.0021  0.0277  ±1.71%   500514
   · lodash                       665,996.26  0.0010  4.6849  0.0015  0.0013  0.0027  0.0042  0.0298  ±2.41%   332999   slowest
   · react-fast-compare           815,727.90  0.0009  0.3981  0.0012  0.0011  0.0024  0.0031  0.0224  ±0.55%   407864
   ✓ isEqual RegExps (4) 5670ms
     name                                 hz     min      max    mean     p75     p99    p995    p999      rme  samples
   · es-toolkit/isEqual         3,805,749.96  0.0002   0.6714  0.0003  0.0002  0.0005  0.0005  0.0022   ±1.51%  1902875   fastest
   · es-toolkit/compat/isEqual  3,759,993.18  0.0002  33.7471  0.0003  0.0002  0.0005  0.0005  0.0026  ±13.27%  1879997
   · lodash                       468,184.31  0.0018   2.3425  0.0021  0.0019  0.0038  0.0080  0.0323   ±1.25%   234093   slowest
   · react-fast-compare         1,760,409.41  0.0004   0.2142  0.0006  0.0005  0.0011  0.0012  0.0131   ±0.43%   880205
   ✓ isEqual objects (4) 3058ms
     name                               hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · es-toolkit/isEqual         282,333.10  0.0028  0.4127  0.0035  0.0032  0.0090  0.0276  0.0441  ±0.88%   141167
   · es-toolkit/compat/isEqual  285,047.83  0.0027  0.6333  0.0035  0.0031  0.0098  0.0282  0.0517  ±0.98%   142524
   · lodash                     278,861.64  0.0029  0.9371  0.0036  0.0032  0.0120  0.0298  0.0447  ±0.95%   139431   slowest
   · react-fast-compare         873,738.88  0.0009  0.5821  0.0011  0.0010  0.0021  0.0035  0.0306  ±0.92%   436876   fastest
   ✓ isEqual arrays (4) 4742ms
     name                                 hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · es-toolkit/isEqual         1,220,726.70  0.0006  0.6043  0.0008  0.0007  0.0015  0.0017  0.0252  ±0.51%   610364
   · es-toolkit/compat/isEqual  1,151,798.89  0.0006  0.4761  0.0009  0.0008  0.0014  0.0019  0.0265  ±0.47%   575900   slowest
   · lodash                     2,070,361.93  0.0003  2.6473  0.0005  0.0004  0.0009  0.0011  0.0223  ±1.61%  1035181   fastest
   · react-fast-compare         1,518,164.03  0.0004  0.9480  0.0007  0.0006  0.0011  0.0013  0.0181  ±1.36%   759116

 BENCH  Summary

  lodash/isEqual - performance/isEqual.bench.ts > isEqual primitives
    2.22x faster than es-toolkit/compat/isEqual
    2.40x faster than es-toolkit/isEqual
    15.53x faster than react-fast-compare

  es-toolkit/isEqual - performance/isEqual.bench.ts > isEqual dates
    1.14x faster than es-toolkit/compat/isEqual
    1.40x faster than react-fast-compare
    1.71x faster than lodash

  es-toolkit/isEqual - performance/isEqual.bench.ts > isEqual RegExps
    1.01x faster than es-toolkit/compat/isEqual
    2.16x faster than react-fast-compare
    8.13x faster than lodash

  react-fast-compare - performance/isEqual.bench.ts > isEqual objects
    3.07x faster than es-toolkit/compat/isEqual
    3.09x faster than es-toolkit/isEqual
    3.13x faster than lodash

  lodash - performance/isEqual.bench.ts > isEqual arrays
    1.36x faster than react-fast-compare
    1.70x faster than es-toolkit/isEqual
    1.80x faster than es-toolkit/compat/isEqual
```

在对比原始值时，`react-fast-compare` 的性能居末，但对比对象、数组时，性能位居前二。在 `React` 中用来对比 `deps`，还是很能打的。