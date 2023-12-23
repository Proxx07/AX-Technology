<script setup lang="ts">
import {usePosts} from "~/composables/Posts";
import {postsTableHeader, perPageObject} from "~/staticContent/Posts";

const {searchedPosts, totalPages, isLoading, query, getPosts, updatePage} = usePosts()
await getPosts()
</script>

<template>
  <div class="page-wrapper">
    <div class="page-wrapper__top">
      <h1> Список постов </h1>

      <v-input v-model="query._searchQuery" placeholder="Поиск..."/>

      <v-select
        v-model="query._limit"
        label="Per page"
        :items="perPageObject"
        @change="updatePage"
      />
    </div>

    <div class="table-wrapper">
      <v-table
        :table-headers="postsTableHeader"
        :table-list="searchedPosts"
        :loading="isLoading"
      />
    </div>

    <div class="page-wrapper__bottom">
      <v-pagination
        v-if="totalPages > 1"
        :total-pages="totalPages"
        :disabled="isLoading"
        @page-change="updatePage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font: var(--heading-font);
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 2rem;
  padding: 2rem;

  &__top {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 2fr 1fr;
  }

}

.table-wrapper {
  max-width: 100%;
  flex-grow: 1;
  overflow: auto;
  max-height: 80vh;
  min-height: 80vh;

  &::-webkit-scrollbar-track {
    visibility: hidden;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--accent-color);
  }
}
</style>
