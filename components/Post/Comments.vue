<script setup lang="ts">
import type {Comment} from "~/composables/Post/types";
import CommentItem from "~/components/Post/CommentItem.vue";

const props = defineProps<{
  commentTitle: string
  commentsList: Comment[]
  loadMoreEnabled: boolean
  searchQuery: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'updateList'): void
}>()
const inputHandler = (value: string) => {
  emit('update:searchQuery', value)
}
</script>

<template>
  <div class="comments">
    <div class="comments__search">
      <div class="comments__search-text">
        Комментарии
      </div>
      <div class="comments__search-input">
        <v-input
          placeholder="Поиск ..."
          v-bind:modelValue="searchQuery"
          @update:modelValue="inputHandler"
        />
      </div>
    </div>

    <div class="comments__list styled-scroll" v-if="commentsList.length">
      <comment-item v-for="comment in commentsList" :comment="comment" :key="comment.id"/>

      <client-only>
        <v-intersection v-if="loadMoreEnabled && !searchQuery" @intersected="emit('updateList')"/>
        <div v-else style="min-height: 2px"></div>
      </client-only>
    </div>
    <div class="comments-empty" v-else>
      Комментарии не найдены ...
    </div>

  </div>
</template>

<style scoped lang="scss">
.comments {
  display: grid;
  grid-auto-rows: 1fr 8fr 1fr;
  gap: 2rem;
  &__list {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__search {
    display: flex;
    gap: 2rem;
    align-items: center;
    &-text {
      font: var(--heading-font);
    }

    &-input {
      flex-grow: 1;
      min-width: 300px;
    }
  }

  .comments-empty {
    font: var(--heading-font);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
