<script setup lang="ts">
import {usePosts} from "~/composables/Posts";

const {list, query, totalPages, getPosts, updatePage} = usePosts()

await getPosts()
</script>

<template>
  <div class="page-wrapper">
    <h1>
      Posts page
    </h1>

  </div>

  <div v-for="post in list">
    {{post.title}}
    <br>
    {{post.body}}
  </div>

  <div>
    <pre>
      {{query}}
    </pre>
  </div>

  <v-pagination
    v-if="totalPages > 1"
    :total-pages="totalPages"
    @page-change="updatePage"
  />

</template>

<style lang="scss" scoped>
h1 {
  font: var(--heading-font);
}
</style>