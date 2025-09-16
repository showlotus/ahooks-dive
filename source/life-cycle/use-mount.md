# [useMount](https://ahooks.js.org/zh-CN/hooks/use-mount#usemount)

## 用法

组件挂载时执行。

<demo react="./use-mount.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useMount/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts{15-17} [useMount.ts]
import { useEffect } from 'react';
import { type EffectCallback } from 'react';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

const useMount = (fn: EffectCallback) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
      );
    }
  }

  useEffect(() => {
    return fn?.();
  }, []);
};

export default useMount;
```

:::

## 解读

先是环境判断，开发模式下传入参数的类型不为 `Function` 时，输出错误日志。

然后，主要逻辑就是上面高亮的 `15-17` 行，用 `useEffect` 包了一层，然后再将入参函数的执行结果返回。
