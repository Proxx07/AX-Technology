import type {TableHead} from "~/composables/Posts/types";

export const postsTableHeader: TableHead[] = [
  {
    name: "Заголовок",
    value: "title",
    width: "30%",
    sortable: true
  },

  {
    name: "Описание",
    value: "body",
    width: "70%",
    sortable: true
  }
]

export const perPageObject: string[] = ["10", "20", "30", "40", "50"]
