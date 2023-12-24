<script setup lang="ts">
const props = defineProps<{
  title: string,
  body: string,
}>();
</script>

<template>
  <div class="post">
    <h2 class="post__title">
      {{ title }}
    </h2>

    <div class="post__body styled-scroll">
      <p v-for="i in 6" :key="i">
        {{ body }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  &__title {
    font: var(--heading-font);
    font-weight: bold;
    font-size: 3.5rem;
    &:first-letter {
      text-transform: uppercase;
    }
  }

  &__body {
    font: var(--text-font);
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
