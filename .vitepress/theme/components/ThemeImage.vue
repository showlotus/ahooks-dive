<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import { useBase } from '../utils'

const props = defineProps({
  light: { type: String, required: true },
  dark: { type: String, required: true },
  alt: { type: String, default: '' },
})

const imageSrc = ref('')
let observer = null

const { page } = useData()

// 计算基于 md 文件路径的绝对路径，所有图片都是以相对路径引入，且与当前文档在同目录下
const resolvedSrc = (src) => {
  // 去掉最后的文件名部分，得到目录路径
  const base = page.value.relativePath.replace(/\/[^/]+$/, '')
  // 将图片路径转换为绝对路径
  const url = new URL(useBase(base + src.replace('./', '/')), import.meta.url)
  return url.href
}

const updateImage = () => {
  imageSrc.value = resolvedSrc(
    document.documentElement.classList.contains('dark')
      ? props.dark
      : props.light
  )
}

onMounted(() => {
  updateImage()
  observer = new MutationObserver(updateImage)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <img :src="imageSrc" :alt="props.alt" />
</template>
