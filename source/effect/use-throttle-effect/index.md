# [useThrottleEffect](https://ahooks.js.org/zh-CN/hooks/use-throttle-effect#usethrottleeffect)

## 📖 用法

用来处理节流副作用的 Hook。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useThrottleEffect/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useThrottleEffect.ts]
import { useEffect } from 'react';
import useThrottleFn from '../useThrottleFn';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';

function useThrottleEffect(effect, options?: ThrottleOptions) {
  const { run } = useThrottleFn(effect, options);
}

export default useThrottleEffect;
```

:::

## 🔍 解读
