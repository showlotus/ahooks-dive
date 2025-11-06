# [useDebounceEffect](https://ahooks.js.org/zh-CN/hooks/use-debounce-effect#usedebounceeffect)

## 📖 用法

用来处理防抖副作用的 Hook。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useDebounceEffect/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useDebounceEffect.ts]
import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { DebounceOptions } from '../useDebounce/debounceOptions';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({});

  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
```

:::

## 🔍 解读
