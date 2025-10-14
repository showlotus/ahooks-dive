# [useHover](https://ahooks.js.org/zh-CN/hooks/use-hover#usehover)

## 📖 用法

监听元素的悬停状态。

<demo react="./demo.tsx" />

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useHover/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useHover.ts]
import useBoolean from '../useBoolean';
import useEventListener from '../useEventListener';
import type { BasicTarget } from '../utils/domTarget';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

export default (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
      onChange?.(true);
    },
    {
      target,
    },
  );

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
      onChange?.(false);
    },
    {
      target,
    },
  );

  return state;
};
```

:::

## 🔍 解读

_TODO_
