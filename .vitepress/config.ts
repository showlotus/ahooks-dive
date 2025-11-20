import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
import react from '@vitejs/plugin-react'
import { useBase } from './theme/utils'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
// import { type LanguageInput } from 'shiki'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ahooks dive',
  description:
    'ahooks dive 是一个深入剖析 ahooks 源码与用法的文档站点，帮助开发者更好地理解和应用 ahooks',
  srcDir: '.',
  outDir: './docs',
  base: useBase(''),
  // lang: 'zh-CN',
  // 设置最后更新时间
  lastUpdated: true,
  // 设置图标
  head: [['link', { rel: 'icon', href: useBase('ahooks-dive.png') }]],
  // cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'useRequest', link: '/source/use-request/' },
      // { text: 'Scene', link: '/source/scene/' },
      // { text: 'LifeCycle', link: '/source/life-cycle/' },
      // { text: 'State', link: '/source/state/' },
      // { text: 'Effect', link: '/source/effect/' },
      // { text: 'Dom', link: '/source/dom/' },
      // { text: 'Advanced', link: '/source/advanced/' },
      // { text: 'Dev', link: '/source/dev/' },
      { text: 'Extra', link: '/source/extra/' },
    ],

    sidebar: [
      {
        text: 'useRequest 🔄',
        link: '/source/use-request/',
        // items: [{ text: '概述', link: '/source/use-request/' }],
      },
      {
        text: 'Scene',
        // link: '/source/scene/',
        items: [
          { text: 'useAntdTable 🔄', link: '/source/scene/use-antd-table/' },
          { text: 'useCountDown 🔄', link: '/source/scene/use-count-down/' },
          { text: 'useCounter 🔄', link: '/source/scene/use-counter/' },
          {
            text: 'useDynamicList 🔄',
            link: '/source/scene/use-dynamic-list/',
          },
          {
            text: 'useFusionTable 🔄',
            link: '/source/scene/use-fusion-table/',
          },
          {
            text: 'useHistoryTravel 🔄',
            link: '/source/scene/use-history-travel/',
          },
          {
            text: 'useInfiniteScroll 🔄',
            link: '/source/scene/use-infinite-scroll/',
          },
          { text: 'useNetwork 🔄', link: '/source/scene/use-network/' },
          { text: 'usePagination 🔄', link: '/source/scene/use-pagination/' },
          { text: 'useSelections 🔄', link: '/source/scene/use-selections/' },
          {
            text: 'useTextSelection 🔄',
            link: '/source/scene/use-text-selection/',
          },
          { text: 'useTheme', link: '/source/scene/use-theme/' },
          {
            text: 'useVirtualList 🔄',
            link: '/source/scene/use-virtual-list/',
          },
          { text: 'useWebSocket 🔄', link: '/source/scene/use-web-socket/' },
        ],
      },
      {
        text: 'LifeCycle',
        // link: '/source/life-cycle/',
        items: [
          { text: 'useMount', link: '/source/life-cycle/use-mount/' },
          { text: 'useUnmount', link: '/source/life-cycle/use-unmount/' },
          {
            text: 'useUnmountedRef',
            link: '/source/life-cycle/use-unmounted-ref/',
          },
        ],
      },
      {
        text: 'State',
        // link: '/source/state/',
        items: [
          { text: 'useBoolean 🔄', link: '/source/state/use-boolean/' },
          {
            text: 'useCookieState 🔄',
            link: '/source/state/use-cookie-state/',
          },
          { text: 'useDebounce', link: '/source/state/use-debounce/' },
          { text: 'useGetState 🔄', link: '/source/state/use-get-state/' },
          {
            text: 'useLocalStorageState 🔄',
            link: '/source/state/use-local-storage-state/',
          },
          { text: 'useMap', link: '/source/state/use-map/' },
          { text: 'usePrevious', link: '/source/state/use-previous/' },
          { text: 'useRafState 🔄', link: '/source/state/use-raf-state/' },
          { text: 'useResetState 🔄', link: '/source/state/use-reset-state/' },
          { text: 'useSafeState', link: '/source/state/use-safe-state/' },
          {
            text: 'useSessionStorageState 🔄',
            link: '/source/state/use-session-storage-state/',
          },
          { text: 'useSet', link: '/source/state/use-set/' },
          { text: 'useSetState', link: '/source/state/use-set-state/' },
          { text: 'useThrottle', link: '/source/state/use-throttle/' },
          { text: 'useToggle 🔄', link: '/source/state/use-toggle/' },
          { text: 'useUrlState 🔄', link: '/source/state/use-url-state/' },
        ],
      },
      {
        text: 'Effect',
        // link: '/source/effect/',
        items: [
          {
            text: 'useAsyncEffect 🔄',
            link: '/source/effect/use-async-effect/',
          },
          {
            text: 'useDebounceEffect',
            link: '/source/effect/use-debounce-effect/',
          },
          { text: 'useDebounceFn', link: '/source/effect/use-debounce-fn/' },
          {
            text: 'useDeepCompareEffect',
            link: '/source/effect/use-deep-compare-effect/',
          },
          {
            text: 'useDeepCompareLayoutEffect',
            link: '/source/effect/use-deep-compare-layout-effect/',
          },
          { text: 'useInterval 🔄', link: '/source/effect/use-interval/' },
          { text: 'useLockFn 🔄', link: '/source/effect/use-lock-fn/' },
          {
            text: 'useRafInterval 🔄',
            link: '/source/effect/use-raf-interval/',
          },
          { text: 'useRafTimeout 🔄', link: '/source/effect/use-raf-timeout/' },
          {
            text: 'useThrottleEffect',
            link: '/source/effect/use-throttle-effect/',
          },
          { text: 'useThrottleFn', link: '/source/effect/use-throttle-fn/' },
          { text: 'useTimeout 🔄', link: '/source/effect/use-timeout/' },
          { text: 'useUpdate', link: '/source/effect/use-update/' },
          {
            text: 'useUpdateEffect',
            link: '/source/effect/use-update-effect/',
          },
          {
            text: 'useUpdateLayoutEffect',
            link: '/source/effect/use-update-layout-effect/',
          },
        ],
      },
      {
        text: 'Dom',
        // link: '/source/dom/',
        items: [
          { text: 'useClickAway 🔄', link: '/source/dom/use-click-away/' },
          {
            text: 'useDocumentVisibility 🔄',
            link: '/source/dom/use-document-visibility/',
          },
          { text: 'useDrag 🔄', link: '/source/dom/use-drag/' },
          { text: 'useDrop 🔄', link: '/source/dom/use-drop/' },
          {
            text: 'useEventListener 🔄',
            link: '/source/dom/use-event-listener/',
          },
          { text: 'useEventTarget 🔄', link: '/source/dom/use-event-target/' },
          { text: 'useExternal 🔄', link: '/source/dom/use-external/' },
          { text: 'useFavicon 🔄', link: '/source/dom/use-favicon/' },
          { text: 'useFocusWithin 🔄', link: '/source/dom/use-focus-within/' },
          { text: 'useFullscreen 🔄', link: '/source/dom/use-fullscreen/' },
          { text: 'useHover 🔄', link: '/source/dom/use-hover/' },
          { text: 'useInViewport 🔄', link: '/source/dom/use-in-viewport/' },
          { text: 'useKeyPress 🔄', link: '/source/dom/use-key-press/' },
          { text: 'useLongPress 🔄', link: '/source/dom/use-long-press/' },
          { text: 'useMouse 🔄', link: '/source/dom/use-mouse/' },
          {
            text: 'useMutationObserver 🔄',
            link: '/source/dom/use-mutation-observer/',
          },
          { text: 'useResponsive 🔄', link: '/source/dom/use-responsive/' },
          { text: 'useScroll 🔄', link: '/source/dom/use-scroll/' },
          { text: 'useSize 🔄', link: '/source/dom/use-size/' },
          { text: 'useTitle 🔄', link: '/source/dom/use-title/' },
        ],
      },
      {
        text: 'Advanced',
        // link: '/source/advanced/',
        items: [
          {
            text: 'useControllableValue 🔄',
            link: '/source/advanced/use-controllable-value/',
          },
          { text: 'useCreation', link: '/source/advanced/use-creation/' },
          {
            text: 'useEventEmitter 🔄',
            link: '/source/advanced/use-event-emitter/',
          },
          {
            text: 'useIsomorphicLayoutEffect',
            link: '/source/advanced/use-isomorphic-layout-effect/',
          },
          { text: 'useLatest', link: '/source/advanced/use-latest/' },
          { text: 'useMemoizedFn', link: '/source/advanced/use-memoized-fn/' },
          { text: 'useReactive', link: '/source/advanced/use-reactive/' },
        ],
      },
      {
        text: 'Dev',
        // link: '/source/dev/',
        items: [
          {
            text: 'useTrackedEffect 🔄',
            link: '/source/dev/use-tracked-effect/',
          },
          {
            text: 'useWhyDidYouUpdate 🔄',
            link: '/source/dev/use-why-did-you-update/',
          },
        ],
      },
      {
        text: 'Extra',
        // link: '/source/extra/',
        items: [
          { text: 'useEffect', link: '/source/extra/use-effect' },
          { text: 'useImmer', link: '/source/extra/use-immer' },
          { text: 'useRef', link: '/source/extra/use-ref' },
          { text: 'useState', link: '/source/extra/use-state' },
        ],
      },
    ],

    // 设置社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/showlotus/ahooks-dive' },
    ],

    // 设置页脚
    footer: {
      copyright: 'Copyright © 2025-present showlotus',
    },

    // 设置搜索
    search: {
      provider: 'local',
    },
    // 设置右侧目录导航
    outline: {
      level: 'deep', // 显示所有层级的标题
      label: '📚 目录', // 目录标题
    },
  },
  markdown: {
    math: true,
    lineNumbers: true,
    config: md => {
      md.use(vitepressDemoPlugin, {
        stackblitz: {
          show: true,
        },
        codesandbox: {
          show: true,
        },
      })
    },
    // codeTransformers: [transformerTwoslash()],
    // Explicitly load these languages for types hightlighting
    // languages: ['js', 'jsx', 'ts', 'tsx'] as unknown as LanguageInput[],
  },

  vite: {
    plugins: [react()],
    css: {
      preprocessorOptions: {
        css: {
          // additionalData: `@import '@shikijs/vitepress-twoslash/style.css';`,
        },
      },
    },
    // 预构建配置
    optimizeDeps: {
      // 强制预构建的依赖
      include: [
        'react',
        'react-dom',
        'antd',
        'ahooks',
        '@vitejs/plugin-react',
        'vitepress-demo-plugin',
      ],
      // 排除不需要预构建的依赖
      exclude: ['vitepress', 'fsevents'],
    },
    // 解决 .node 文件加载器问题
    resolve: {
      alias: {
        // 忽略 fsevents 在非 macOS 系统上的问题
        fsevents: 'rollup-plugin-node-polyfills/polyfills/fs-events',
        // 路径别名：简化 theme 组件的引入路径
        '@theme': path.resolve(__dirname, 'theme'),
      },
    },
    // 构建配置
    build: {
      // 启用依赖预构建
      commonjsOptions: {
        include: [/node_modules/],
      },
      // 设置块大小警告限制
      chunkSizeWarningLimit: 1000,
      // 启用源码映射
      sourcemap: true,
      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 处理原生模块
      rollupOptions: {
        external: ['fsevents'],
        output: {
          assetFileNames: assetInfo => {
            // 本地资源
            if (assetInfo.originalFileNames?.[0]?.startsWith('source/')) {
              const ext = assetInfo.name?.split('.').pop() || ''
              // 将图片输出到原 md 文件所在目录
              if (/^(png|jpeg|jpg|svg|webp)$/.test(ext)) {
                const dir = assetInfo.originalFileNames[0]
                  .split('/')
                  .slice(0, -1)
                  .join('/')
                return `${dir}/[name][extname]`
              }
            }
            return 'assets/[name].[hash][extname]'
          },
        },
      },
    },
    // 开发服务器配置
    server: {
      // 忽略 fsevents 警告
      fs: {
        allow: ['..'],
      },
    },
  },

  ignoreDeadLinks: true,
})
