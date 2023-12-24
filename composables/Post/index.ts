import type {Post} from "~/composables/Posts/types";
import type {Comment} from "~/composables/Post/types";
import $request from "~/composables/request";
import {setPost} from "~/composables/Post/models";
import {ListsQuery} from "~/composables/Posts/types";
import {stringQueryCheck} from "~/utils/scripts";
export const usePost = () => {
  const $route = useRoute();

  const postItem = ref<Post>(setPost());

  const commentsList = ref<Comment[]>([]);
  const loadMoreEnabled = ref(true);
  const query = ref<ListsQuery>({
    _start: "0",
    _limit: "2",
    _searchQuery: ""
  });

  const searchedCommentsList = computed<Comment[]>(() => {
    if (!query.value._searchQuery) return commentsList.value
    const searchString = stringQueryCheck(query.value._searchQuery)
    const regex = new RegExp(query.value._searchQuery, 'gi')

    return commentsList.value
      .filter(comment => {
        return searchString(comment.name) || searchString(comment.body) || searchString(comment.email)
      })
      .map(comment => {
        return {
          ...comment,
          name: comment.name.replace(regex, (match) => `<mark>${match}</mark>`),
          body: comment.body.replace(regex, (match) => `<mark>${match}</mark>`),
          email: comment.email.replace(regex, (match) => `<mark>${match}</mark>`)
        };
      })
  })
  const getPost = async (id: string = $route.params.id as string) => {
    const [post] = await $request<Post[]>(
      '/posts',
      {params: {id}}
    )
    postItem.value = setPost(post)
  };
  const getPostComments = async (id: string = $route.params.id as string) => {
    const comments = await $request<Comment[]>(
      `/posts/${id}/comments`,
      {query: query.value}
    )
    if (Array.isArray(comments)) {
      loadMoreEnabled.value = !!comments.length
      query.value._start = `${Number(query.value._start) + Number(query.value._limit)}`
      commentsList.value = [...commentsList.value, ...comments]
    } else {
      loadMoreEnabled.value = false
    }
  };

  return {
    postItem,
    searchedCommentsList,
    loadMoreEnabled,
    query,

    getPostComments,
    getPost,
  }
}
