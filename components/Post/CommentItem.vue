<script setup lang="ts">
import type {Comment} from "~/composables/Post/types";
const props = defineProps<{
  comment: Comment
}>()
</script>

<template>
  <div class="comment">
    <div class="comment__author">
      <div class="comment__author-name">
        <span class="comment__title">Автор: </span>
        <span class="comment__value" v-html="comment.name" />
      </div>
      <div class="comment__author-email">
        <span class="comment__title">Email: </span>
        <span class="comment__value" v-html="comment.email"/>
      </div>
    </div>
    <div class="comment__body" v-html="comment.body"/>
  </div>
</template>

<style scoped lang="scss">
.comment {
  padding: 2rem;
  border: 1px solid var(--accent-border);
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font: var(--text-font);
  &__author {
    &-name {
      margin-bottom: 1rem;
    }
  }
  &__title {
    font-weight: bold;
  }
}
</style>
