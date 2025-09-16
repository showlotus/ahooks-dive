# [useUnmount](https://ahooks.js.org/zh-CN/hooks/use-unmount#useunmount)

## 用法

组件卸载时执行。

<demo react="./use-unmount.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useUnmount/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts{15-20} [useUnMount.ts]
import { useEffect } from 'react';
import useLatest from '../useLatest';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

const useUnmount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};

export default useUnmount;
```

:::

[`useLatest`](/source/advanced/use-latest.md) 的作用是返回最新的值。

## 解读

先是环境判断，开发模式下传入参数的类型不为 `Function` 时，输出错误日志。

然后，主要逻辑就是上面高亮的 `15-17` 行，用 `useEffect` 包了一层，然后再将入参函数的执行结果返回。
