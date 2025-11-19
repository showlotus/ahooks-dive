# [useReactive](https://ahooks.js.org/zh-CN/hooks/use-reactive)

## 📖 用法

提供一个响应式对象，当对象的属性发生变化时，会自动更新页面。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useReactive/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useReactive.ts]
import { useRef } from 'react';
import isPlainObject from 'lodash/isPlainObject';
import useCreation from '../useCreation';
import useUpdate from '../useUpdate';

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
const rawMap = new WeakMap();

function observer<T extends Record<string, any>>(initialVal: T, cb: () => void): T {
  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }

  // 防止代理已经代理过的对象
  // https://github.com/alibaba/hooks/issues/839
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);

      // https://github.com/alibaba/hooks/issues/1317
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (!descriptor?.configurable && !descriptor?.writable) {
        return res;
      }

      // Only proxy plain object or array,
      // otherwise it will cause: https://github.com/alibaba/hooks/issues/2080
      return isPlainObject(res) || Array.isArray(res) ? observer(res, cb) : res;
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);

  return proxy;
}

function useReactive<S extends Record<string, any>>(initialState: S): S {
  const update = useUpdate();
  const stateRef = useRef<S>(initialState);

  const state = useCreation(() => {
    return observer(stateRef.current, () => {
      update();
    });
  }, []);

  return state;
}

export default useReactive;
```

:::

## 🔍 解读

::: tip
关于 `useCreation`、`useUpdate`，可以查看对应文档：[useCreation](../use-creation/)、[useUpdate](../use-update/)。
:::

_TODO_
