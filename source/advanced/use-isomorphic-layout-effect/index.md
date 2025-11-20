# [useIsomorphicLayoutEffect](https://ahooks.js.org/zh-CN/hooks/use-isomorphic-layout-effect)

## 📖 用法

在非浏览器环境返回 `useEffect`，在浏览器环境返回 `useLayoutEffect`。

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useIsomorphicLayoutEffect/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useIsomorphicLayoutEffect.ts]
import { useEffect, useLayoutEffect } from 'react';
import isBrowser from '../utils/isBrowser';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
```

:::

## 🔍 解读

在浏览器环境返回 `useLayoutEffect`，在非浏览器环境返回 `useEffect`。
