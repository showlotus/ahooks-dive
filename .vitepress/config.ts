import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
import react from '@vitejs/plugin-react'
import { useBase } from './theme/utils'
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
        text: 'useRequest',
        // link: '/source/use-request/',
        // items: [{ text: '概述', link: '/source/use-request/' }],
      },
      {
        text: 'Scene',
        // link: '/source/scene/',
        items: [{ text: 'useTheme', link: '/source/scene/use-theme' }],
      },
      {
        text: 'LifeCycle',
        // link: '/source/life-cycle/',
        items: [
          { text: 'useMount', link: '/source/life-cycle/use-mount' },
          { text: 'useUnmount', link: '/source/life-cycle/use-unmount' },
          {
            text: 'useUnmountedRef',
            link: '/source/life-cycle/use-unmounted-ref',
          },
        ],
      },
      {
        text: 'State',
        // link: '/source/state/',
        items: [
          { text: 'useRafState', link: '/source/state/use-raf-state' },
          { text: 'useSetState', link: '/source/state/use-set-state' },
        ],
      },
      {
        text: 'Effect',
        // link: '/source/effect/',
        // items: [{ text: '概述', link: '/source/effect/' }],
      },
      {
        text: 'Dom',
        // link: '/source/dom/',
        items: [{ text: 'useScroll', link: '/source/dom/use-scroll' }],
      },
      {
        text: 'Advanced',
        // link: '/source/advanced/',
        items: [
          { text: 'useLatest', link: '/source/advanced/use-latest' },
          { text: 'useMemoizedFn', link: '/source/advanced/use-memoized-fn' },
        ],
      },
      {
        text: 'Dev',
        // link: '/source/dev/',
        // items: [{ text: '概述', link: '/source/dev/' }],
      },
      {
        text: 'Extra',
        // link: '/source/extra/',
        items: [
          { text: 'useEffect', link: '/source/extra/use-effect' },
          { text: 'useState', link: '/source/extra/use-state' },
          { text: 'useRef', link: '/source/extra/use-ref' },
          { text: 'useImmer', link: '/source/extra/use-immer' },
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
