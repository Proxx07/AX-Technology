
export interface TableHead {
  name: string
  value: string
  width?: string
  sortable?: boolean
}
export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface ListsQuery {
  _start: string
  _limit: string
  _searchQuery: string
}
