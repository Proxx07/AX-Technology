<script setup lang="ts">
import {onMounted} from "vue";
const emit = defineEmits<{
  (e: 'intersected'): void
}>()

const intersection = ref();
const observer = new IntersectionObserver(callback, {})
function callback(entries: IntersectionObserverEntry[]) {
  if (!entries[0].isIntersecting) return
  emit('intersected')
}
onMounted(() => {
  observer.observe(intersection.value)
})
onBeforeUnmount(() => {
  observer.unobserve(intersection.value)
})
</script>

<template>
  <div class="intersection" ref="intersection">
    <div class="line"></div>
  </div>
</template>

<style scoped lang="scss">
@keyframes loading {
  0% {
    left: 0;
    right: 100%;
  }
  50% {
    left: 0;
    right: 0;
  }
  100% {
    right: 0;
    left: 100%;
  }
}
.intersection {
  min-height: 2px;
  margin: 0 2rem;
  position: relative;
  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--seconday-bg);
    animation: loading 1s ease-in-out infinite;
  }
}
</style>
