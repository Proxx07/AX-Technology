import type {Post, PostsQuery} from "./types";
import $request from "~/composables/request";
export const usePosts = () => {
  const $router = useRouter();
  const $route = useRoute();

  const totalItems = 100;
  const totalPages = computed(() => Math.ceil(totalItems / +query.value._limit))

  const isLoading = ref(false)
  const list = ref<Post[]>([])

  const query = ref<PostsQuery>({
    _start: $route.query.start as string || "0",
    _limit: $route.query.limit as string || "10",
    _searchQuery: ""
  })

  const searchedPosts = computed<Post[]>(() => {
    if (!query.value._searchQuery || query.value._searchQuery?.length < 2) return list.value
    return list.value
      .filter(post => {
        return post.title.toLowerCase().includes(query.value._searchQuery?.toLowerCase()) || post.body.toLowerCase().includes(query.value._searchQuery?.toLowerCase())
      }).map(post => {
        const regex = new RegExp(query.value._searchQuery, 'gi')
        return {
          ...post,
          title: post.title.replace(regex, (match) => `<mark>${match}</mark>`),
          body: post.body.replace(regex, (match) => `<mark>${match}</mark>`)
        };
      })
  })
  const getPosts = async () => {
    try {
      isLoading.value = true
      const result = await $request("/posts", { query: query.value })
      list.value = Array.isArray(result) ? result : []
    }
    finally {
      isLoading.value = false
    }
  }
  const updatePage = async (page: number = 1) => {
    console.log(query.value._limit)
    const start = `${page * +query.value._limit - +query.value._limit}`
    query.value._start = start

    await $router.push({ query: { start, page } })
    await getPosts()
  }

  return {
    searchedPosts,
    query,
    totalPages,
    isLoading,

    getPosts,
    updatePage,
  }
}
