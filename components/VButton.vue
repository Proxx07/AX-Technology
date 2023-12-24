<script setup lang="ts"></script>

<template>
  <button>
    <slot/>
  </button>
</template>

<style scoped lang="scss">
button {
  --color: var(--accent-color);
  --bg: var(--accent-bg);

  cursor: pointer;
  transition: all 0.3s;
  font: var(--note-font);
  color: var(--color);
  background-color: var(--bg);
  border: 1px solid var(--color);

  &:hover,
  &.active {
    --color: var(--seconday-color);
    --bg: var(--seconday-bg);
    border-color: var(--bg);
  }

  &[disabled] {
    pointer-events: none;
  }
}
</style>
