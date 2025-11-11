# ahooks dive 🚀

一个深入剖析 ahooks 源码与用法的文档站点，帮助开发者更好地理解和应用 ahooks。

当前已完成的 Hook 如下：

| Type      | Hook                       | ✅ (20/77) |
| --------- | -------------------------- | ---------- |
| Network   | useRequest                 |            |
| --------- | -------------------------- | ---------- |
| Scene     | useAntdTable               |            |
| Scene     | useFusionTable             |            |
| Scene     | useInfiniteScroll          |            |
| Scene     | usePagination              |            |
| Scene     | useDynamicList             |            |
| Scene     | useVirtualList             |            |
| Scene     | useHistoryTravel           |            |
| Scene     | useNetwork                 |            |
| Scene     | useSelections              |            |
| Scene     | useCountDown               |            |
| Scene     | useCounter                 |            |
| Scene     | useTextSelection           |            |
| Scene     | useWebSocket               |            |
| Scene     | useTheme                   | ✅         |
| --------- | -------------------------- | ---------- |
| LifeCycle | useMount                   | ✅         |
| LifeCycle | useUnmount                 | ✅         |
| LifeCycle | useUnmountedRef            | ✅         |
| --------- | -------------------------- | ---------- |
| State     | useSetState                | ✅         |
| State     | useBoolean                 |            |
| State     | useToggle                  |            |
| State     | useUrlState                |            |
| State     | useCookieState             |            |
| State     | useLocalStorageState       |            |
| State     | useSessionStorageState     |            |
| State     | useDebounce                | ✅         |
| State     | useThrottle                | ✅         |
| State     | useMap                     | ✅         |
| State     | useSet                     | ✅         |
| State     | usePrevious                | ✅         |
| State     | useRafState                |            |
| State     | useSafeState               |            |
| State     | useGetState                |            |
| State     | useResetState              |            |
| --------- | -------------------------- | ---------- |
| Effect    | useUpdateEffect            | ✅         |
| Effect    | useUpdateLayoutEffect      | ✅         |
| Effect    | useAsyncEffect             |            |
| Effect    | useDebounceEffect          | ✅         |
| Effect    | useDebounceFn              | ✅         |
| Effect    | useThrottleFn              | ✅         |
| Effect    | useThrottleEffect          | ✅         |
| Effect    | useDeepCompareEffect       | ✅         |
| Effect    | useDeepCompareLayoutEffect | ✅         |
| Effect    | useInterval                |            |
| Effect    | useRafInterval             |            |
| Effect    | useTimeout                 |            |
| Effect    | useRafTimeout              |            |
| Effect    | useLockFn                  |            |
| Effect    | useUpdate                  |            |
| --------- | -------------------------- | ---------- |
| DOM       | useEventListener           |            |
| DOM       | useClickAway               |            |
| DOM       | useDocumentVisibility      |            |
| DOM       | useDrop & useDrag          |            |
| DOM       | useEventTarget             |            |
| DOM       | useExternal                |            |
| DOM       | useTitle                   |            |
| DOM       | useFavicon                 |            |
| DOM       | useFullscreen              |            |
| DOM       | useHover                   |            |
| DOM       | useMutationObserver        |            |
| DOM       | useInViewport              |            |
| DOM       | useKeyPress                |            |
| DOM       | useLongPress               |            |
| DOM       | useMouse                   |            |
| DOM       | useResponsive              |            |
| DOM       | useScroll                  |            |
| DOM       | useSize                    |            |
| DOM       | useFocusWithin             |            |
| --------- | -------------------------- | ---------- |
| Advanced  | useControllableValue       |            |
| Advanced  | useCreation                |            |
| Advanced  | useEventEmitter            |            |
| Advanced  | useIsomorphicLayoutEffect  |            |
| Advanced  | useLatest                  | ✅         |
| Advanced  | useMemoizedFn              | ✅         |
| Advanced  | useReactive                |            |
| --------- | -------------------------- | ---------- |
| Dev       | useTrackedEffect           |            |
| Dev       | useWhyDidYouUpdate         |            |

## 📖 项目简介

ahooks dive 是一个专注于 ahooks 源码分析与用法讲解的文档项目。通过深入浅出的方式，帮助开发者：

- 🔍 **深入源码** - 理解 ahooks 的实现原理和设计思想
- 🎯 **掌握用法** - 学习各种 Hook 的最佳实践和高级用法
- 🚀 **提升技能** - 通过源码学习提升 React Hooks 开发能力
- 💡 **启发思维** - 从优秀源码中获取编程灵感和设计模式

## 🎯 核心特性

### 🌐 网络请求

深入 useRequest 的实现原理，掌握请求管理、缓存策略、错误处理等高级功能

### 📱 场景应用

通过实际业务场景的案例，学习如何将 ahooks 应用到真实的项目开发中

### 🔄 生命周期

了解组件生命周期的管理方式，以及如何在函数组件中模拟类组件的生命周期

### 🎯 状态管理

深入理解 ahooks 中的状态管理机制，包括 useState、useReducer 等核心 Hook 的实现原理

### ⚡ 副作用处理

掌握 useEffect、useLayoutEffect 等副作用处理 Hook 的最佳实践和性能优化技巧

### 🎨 DOM 操作

学习如何在 React 函数组件中进行 DOM 操作，包括事件监听、元素引用等

### 🚀 高级用法

探索 ahooks 的高级特性和自定义 Hook 开发技巧，提升代码质量和开发效率

### 🛠️ 开发工具

了解 ahooks 提供的调试工具和开发辅助功能，让开发过程更加高效

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 📁 项目结构

```
ahooks-dive/
├── .vitepress/          # VitePress 配置
├── source/              # 文档源码
│   ├── advanced/        # 高级用法
│   ├── dev/            # 开发工具
│   ├── dom/            # DOM 操作
│   ├── effect/         # 副作用处理
│   ├── life-cycle/     # 生命周期
│   ├── scene/          # 场景应用
│   ├── state/          # 状态管理
│   └── use-request/    # 网络请求
├── index.md            # 首页
├── package.json        # 项目配置
└── README.md           # 项目说明
```

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue](https://vuejs.org/) - 前端框架
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [pnpm](https://pnpm.io/) - 包管理器

## 📚 学习路径

1. **入门阶段** - 从 useRequest 开始，了解基础用法
2. **进阶阶段** - 学习状态管理和副作用处理
3. **高级阶段** - 深入源码分析和自定义 Hook 开发
4. **实战阶段** - 通过场景应用提升实际开发能力

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

### 贡献方式

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [ahooks 官方文档](https://ahooks.js.org/)
- [ahooks GitHub 仓库](https://github.com/alibaba/hooks)
- [React 官方文档](https://react.dev/)

## ⭐ 支持我们

如果这个项目对你有帮助，请给我们一个 ⭐️
