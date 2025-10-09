<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  light: { type: String, required: true },
  dark: { type: String, required: true },
  alt: { type: String, default: '' },
})

const imageSrc = ref(props.light)
let observer = null

const updateImage = () => {
  imageSrc.value = document.documentElement.classList.contains('dark')
    ? props.dark
    : props.light
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
