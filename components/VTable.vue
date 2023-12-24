<script setup lang="ts">
import type {TableHead} from "~/composables/Posts/types";
import SortIcon from "~/components/icons/SortIcon.vue";

const props = defineProps<{
  tableHeaders: TableHead[]
  tableList: any[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'rowClicked', item: any): void
  (e: 'headClicked', value: string): void
}>()

const sort = ref<"asc" | "desc">("asc")
const sortField = ref("")

const sortedList = computed<any[]>(() => {
  if (!sortField.value) return props.tableList
  return props.tableList.sort((a, b) => {
    const sortFunction = Number.isNaN(Number(a[sortField.value]))
        ? a[sortField.value].toString().localeCompare(b[sortField.value].toString())
        : a[sortField.value] - b[sortField.value]

    return sort.value === "asc" ? sortFunction : -1 * sortFunction
  })
});

const rowClickHandler = (item: any) => {
  emit('rowClicked', item)
}
const sortHandler = (head: TableHead) => {
  emit('headClicked', head.value)
  if (!head.sortable) return
  sort.value = sort.value === "asc" ? "desc" : "asc"
  sortField.value = head.value
}
</script>

<template>
  <table :class="{'loading': props.loading}">
    <thead>
      <tr>
        <th
          v-for="header in tableHeaders"
          :width="header?.width"
          :key="header.value"
          @click="sortHandler(header)"
        >
          <span> {{header.name}} </span>
          <span v-if="header.sortable" class="sorting-icon">
            <sort-icon/>
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-if="tableList.length"
        v-for="item in sortedList"
        :key="item"
        @click="rowClickHandler({...item})"
      >
        <td v-for="header in tableHeaders">
          <span class="cell-text" v-html="item[header.value]" />
        </td>
      </tr>

      <tr v-else>
        <td :colspan="tableHeaders.length" align="center">
          <div class="empty-text"> Пусто... <span>&#128511;</span></div>
        </td>
      </tr>
    </tbody>

  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  thead {
    font: var(--text-font);
    background: var(--seconday-bg);
    color: var(--seconday-color);
    text-align: left;
    border: 1px solid var(--accent-border);
    position: sticky;
    top: -1px;
    z-index: 100;
    transition: all .4s;
  }

  tbody {
    font: var(--note-font);
    background: var(--accent-bg);
    border: 1px solid var(--accent-border);
    border-radius: 0 0 .4rem .4rem;
    transition: all .4s;
  }

  tr {
    border-bottom: 1px solid var(--accent-border);
    cursor: pointer;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      background: var(--seconday-bg);
      transition: all .4s;
    }
    &:hover {
      &:before {
        opacity: 0.1;
      }
    }
  }

  th {
    padding: 1.5rem 1rem;
    font-weight: 600;
    .sorting-icon {
      display: inline-block;
      height: 100%;
      margin-left: .5rem;
      margin-top: .3rem;
      vertical-align: top;
      font-size: 0;
      svg {
        width: 20px;
        :deep(path) {
          fill: var(--seconday-color);
        }
      }
    }
  }

  td {
    padding: 1rem;
    border-right: 1px solid var(--accent-border);
  }

  .cell-text {
    transition: all .4s;
  }
  .empty-text {
    font: var(--heading-font);
  }
  &.loading {
    pointer-events: none;
    user-select: none;
    .cell-text {
      text-shadow: 0 0 2rem var(--accent-color);
      filter: blur(0.5rem);
    }
  }

}
</style>
