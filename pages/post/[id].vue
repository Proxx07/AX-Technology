<script setup lang="ts">
import {usePost} from "~/composables/Post";
import Comments from "~/components/Post/Comments.vue";

const { postItem, searchedCommentsList, loadMoreEnabled, query, getPost, getPostComments } = usePost();

await getPost();
await getPostComments();

</script>

<template>
  <div class="page-wrapper">
    <h1> Пост № {{ postItem.id }}</h1>

    <div class="back-link">
      <v-button @click="useRouter().push({name: 'index'})">
        Вернуться к списку
      </v-button>
    </div>

    <div class="post-wrapper">
      <post
        :title="postItem.title"
        :body="postItem.body"
        class="post-item"
      />
      <comments
        v-model:searchQuery="query._searchQuery"
        comment-title="Комментарии"
        class="comments-item"
        :loadMoreEnabled="loadMoreEnabled"
        :comments-list="searchedCommentsList"
        @update-list="getPostComments"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 3.5rem;
  line-height: 1.6;
}
.page-wrapper {
  padding: 2rem;
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-auto-rows: 1fr 1fr 10fr;
  gap: 3rem;
}

.post-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-height: 70vh;

}
.post-item,
.comments-item {
  padding: 3rem 2rem;
  border-radius: 1rem;
  border: 2px solid var(--accent-border);
  flex-grow: 1;
  max-height: 70vh;
}

.back-link {
  display: flex;
  align-items: center;
  button {
    border-radius: .5rem;
    padding: 1rem 2rem;
  }
}
</style>
