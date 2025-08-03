import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ahooks dive',
  description:
    'ahooks dive 是一个深入剖析 ahooks 源码与用法的文档站点，帮助开发者更好地理解和应用 ahooks',
  srcDir: '.',
  outDir: './docs',
  base: process.env.NODE_ENV === 'production' ? '/ahooks-dive/' : '/',
  // lang: 'zh-CN',
  // 设置最后更新时间
  lastUpdated: true,
  // 设置图标
  head: [['link', { rel: 'icon', href: '/ahooks.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'useRequest', link: '/source/use-request/' },
      { text: 'Scene', link: '/source/scene/' },
      { text: 'LifeCycle', link: '/source/life-cycle/' },
      { text: 'State', link: '/source/state/' },
      { text: 'Effect', link: '/source/effect/' },
      { text: 'Dom', link: '/source/dom/' },
      { text: 'Advanced', link: '/source/advanced/' },
      { text: 'Dev', link: '/source/dev/' },
    ],

    sidebar: [
      {
        text: 'useRequest',
        items: [{ text: '概述', link: '/source/use-request/' }],
      },
      {
        text: 'Scene',
        items: [{ text: '概述', link: '/source/scene/' }],
      },
      {
        text: 'LifeCycle',
        items: [{ text: '概述', link: '/source/life-cycle/' }],
      },
      {
        text: 'State',
        items: [{ text: '概述', link: '/source/state/' }],
      },
      {
        text: 'Effect',
        items: [{ text: '概述', link: '/source/effect/' }],
      },
      {
        text: 'Dom',
        items: [{ text: '概述', link: '/source/dom/' }],
      },
      {
        text: 'Advanced',
        items: [{ text: '概述', link: '/source/advanced/' }],
      },
      {
        text: 'Dev',
        items: [{ text: '概述', link: '/source/dev/' }],
      },
    ],

    // 设置社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/showlotus/ahooks-dive' }],

    // 设置页脚
    footer: {
      copyright: 'Copyright © 2025-present ahooks dive',
    },

    // 设置搜索
    search: {
      provider: 'local',
    },
    // 设置右侧目录导航
    outline: {
      level: 'deep', // 显示所有层级的标题
      label: ' ', // 目录标题
    },
  },
  markdown: {
    math: true,
    lineNumbers: true,
  },
})
