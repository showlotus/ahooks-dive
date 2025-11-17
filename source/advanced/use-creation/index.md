# [useCreation](https://ahooks.js.org/zh-CN/hooks/use-creation)

## 📖 用法

缓存计算量较大或创建成本较高的数据。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useCreation/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useCreation.ts]
import type { DependencyList } from 'react';
import { useRef } from 'react';
import depsAreSame from '../utils/depsAreSame';

const useCreation = <T>(factory: () => T, deps: DependencyList) => {
  const { current } = useRef({
    deps,
    obj: undefined as T,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj;
};

export default useCreation;
```

<!-- prettier-ignore -->
```ts [depsAreSame.ts]
import type { DependencyList } from 'react';

function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
  if (oldDeps === deps) {
    return true;
  }
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) {
      return false;
    }
  }
  return true;
}

export default depsAreSame;
```

:::

## 🔍 解读

_TODO_

