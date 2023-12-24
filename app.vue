<template>
  <div class="site-wrapper">
    <NuxtPage/>

    <client-only>
      <theme-toggler/>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.site-wrapper {
  min-height: 100vh;
}
</style>
<script setup lang="ts">
</script>
