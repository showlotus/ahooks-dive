# [useTheme](https://ahooks.js.org/zh-CN/hooks/use-theme)

## 📖 用法

```tsx
const theme = useTheme()
```

## 📄 [源码](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useTheme/index.ts)

::: code-group

<!-- prettier-ignore -->
```ts [useTheme.ts]
import { useEffect, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import isBrowser from '../utils/isBrowser';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type ThemeModeType = `${ThemeMode}`;

export type ThemeType = 'light' | 'dark';

const useCurrentTheme = () => {
  const matchMedia = isBrowser ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (isBrowser) {
      return matchMedia?.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
    } else {
      return ThemeMode.LIGHT;
    }
  });

  useEffect(() => {
    const onThemeChange: MediaQueryList['onchange'] = (event) => {
      if (event.matches) {
        setTheme(ThemeMode.DARK);
      } else {
        setTheme(ThemeMode.LIGHT);
      }
    };

    matchMedia?.addEventListener('change', onThemeChange);

    return () => {
      matchMedia?.removeEventListener('change', onThemeChange);
    };
  }, []);

  return theme;
};

type Options = {
  localStorageKey?: string;
};

export default function useTheme(options: Options = {}) {
  const { localStorageKey } = options;

  const [themeMode, setThemeMode] = useState<ThemeModeType>(() => {
    const preferredThemeMode =
      localStorageKey?.length && (localStorage.getItem(localStorageKey) as ThemeModeType | null);

    return preferredThemeMode || ThemeMode.SYSTEM;
  });

  const setThemeModeWithLocalStorage = (mode: ThemeModeType) => {
    setThemeMode(mode);

    if (localStorageKey?.length) {
      localStorage.setItem(localStorageKey, mode);
    }
  };

  const currentTheme = useCurrentTheme();
  const theme = themeMode === ThemeMode.SYSTEM ? currentTheme : themeMode;

  return {
    theme,
    themeMode,
    setThemeMode: useMemoizedFn(setThemeModeWithLocalStorage),
  };
}
```

## 🔍 解读

_TODO_
