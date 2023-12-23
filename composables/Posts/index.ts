import type {Post, PostsQuery} from "./types";
import $request from "~/composables/request";
export const usePosts = () => {
  const $router = useRouter();
  const $route = useRoute();

  const totalItems = 100;
  const totalPages = computed(() => Math.ceil(totalItems / +query.value._limit))

  const list = ref<Post[]>([])
  const query = ref<PostsQuery>({
    _start: $route.query.start as string || "0",
    _limit: $route.query.limit as string || "10",
  })

  const getPosts = async () => {
    const result = await $request("/posts", { query: query.value })
    list.value = Array.isArray(result) ? result : []
  }

  const updatePage = async (page: number = 1) => {
    const start = `${page * +query.value._limit - +query.value._limit}`
    query.value._start = start

    await $router.push({ query: { start, page } })
    await getPosts()
  }

  return {
    list,
    query,
    totalPages,
    getPosts,
    updatePage
  }
}
