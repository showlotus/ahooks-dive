# [useUnmount](https://ahooks.js.org/zh-CN/hooks/use-unmount#useunmount)

## 用法

<demo react="./useUnmount.tsx" />

## [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useUnmount/index.ts)

<!-- prettier-ignore -->
```js{15-20}
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

[`useLatest`](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useLatest/index.ts) 的作用是返回一个最新的值，这里主要是为了解决闭包问题。

<!-- prettier-ignore -->
```js
import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
```

## 解读

先是环境判断，开发模式下传入参数的类型不为 `Function` 时，输出错误日志。

然后，主要逻辑就是上面高亮的 `15-17` 行，用 `useEffect` 包了一层，然后再将入参函数的执行结果返回。
