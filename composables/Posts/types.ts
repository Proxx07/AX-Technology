
export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface PostsQuery {
  _start: string
  _limit: string
  _searchQuery?: string
}