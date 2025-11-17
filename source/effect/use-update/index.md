# [useUpdate](https://ahooks.js.org/zh-CN/hooks/use-update)

## 📖 用法

返回一个函数，调用该函数会强制组件重新渲染。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useUpdate/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useUpdate.ts]
import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useUpdate;
```

:::

## 🔍 解读

<!-- prettier-ignore -->
```ts
function useUpdate() {
  // 1. 使用 useState 定义一个空对象，用于记录状态，只需要这个状态更新函数，不需要这个状态
  const [, setState] = useState({});

  // 2. 使用 useCallback 返回一个函数，调用该函数会执行 setState 函数，传入一个空对象，从而触发组件重新渲染
  return useCallback(() => setState({}), []);
}
```
