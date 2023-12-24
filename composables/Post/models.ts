import type {Post} from "~/composables/Posts/types";
import type {Comment} from "~/composables/Post/types";
export const setPost = (item: Post | void): Post => {
  return {
    userId: item?.userId || 0,
    id: item?.id || 0,
    title: item?.title || "",
    body: item?.body || "",
  }
}

export const setComment = (item: Comment | void): Comment => {
  return {
    postId: item?.postId || 0,
    id: item?.id || 0,
    name: item?.name || "",
    email: item?.email || "",
    body: item?.body || "",
  }
}
