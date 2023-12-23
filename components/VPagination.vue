<script setup lang="ts">
const $route = useRoute();

const props = defineProps<{
  totalPages: number,
  modelValue?: string,
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: string | number): void
  (e: 'update:modelValue', page: string): void
}>()

const activePage = ref(Number($route.query?.page) || 1)
const pagesArray = ref<number[]>(Array.from({length: props.totalPages}, (_, i) => i + 1))

const visibleItems = 3
const sideItems = Math.floor(visibleItems / 2)
const filteredPages = (): (number | undefined)[] => {
  return pagesArray.value.map(page => {
    if (activePage.value <= visibleItems || activePage.value > props.totalPages - visibleItems) {
      if (page <= visibleItems || page > props.totalPages - visibleItems) return page
    } else {
      if (page === 1) return page
      if (page === props.totalPages) return page
      if ((page <= activePage.value && page >= activePage.value - sideItems) || (page > activePage.value && page <= activePage.value + sideItems)) return page
    }
  })
}

const renderingPages = computed(() => {
  const array = filteredPages()
  const result: (string | number)[] = [];
  array.forEach((item, index) => {
    if (item === undefined) {
      const nextItemVal = array[index + 1];
      if (nextItemVal !== undefined) {
        result.push("...");
      }
    } else {
      result.push(item);
    }
  });

  return result
})
const changePage = (page: number) => {
  activePage.value = page
  emit('update:modelValue', `${page}`)
  emit('pageChange', page)
}

watch(() => props.totalPages,
  () => {
    pagesArray.value = Array.from({length: props.totalPages}, (_, i) => i + 1)
    activePage.value = 1
  }
)
</script>

<template>
  <div class="pagination" v-if="totalPages">
    <button class="prev" :disabled="activePage == 1 || disabled" @click="changePage(+activePage - 1)">
      {{ "<" }}
    </button>

    <template v-for="page in renderingPages">
      <button
        v-if="Number.isInteger(page)"
        :class="{active: page == activePage}"
        :disabled="page == activePage || disabled"
        :key="page"
        @click="changePage(+page)"
      >
        {{ page }}
      </button>
      <span v-else class="separator"> {{ page }} </span>
    </template>

    <button class="next" :disabled="activePage == totalPages || disabled" @click="changePage(+activePage + 1)">
      {{ ">" }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;

  button {
    --color: var(--accent-color);
    --bg: var(--accent-bg);

    cursor: pointer;
    padding: .8rem 1.3rem;
    border-radius: 5rem;
    text-align: center;
    min-width: 5rem;
    transition: all 0.3s;
    font: var(--note-font);
    color: var(--color);
    background-color: var(--bg);
    border: 1px solid var(--color);

    &:hover,
    &.active {
      --color: var(--seconday-color);
      --bg: var(--seconday-bg);
      border-color: var(--bg);
    }

    &[disabled] {
      pointer-events: none;
    }
  }

  .separator {
    font: var(--note-font);
    padding: .9rem 1.5rem .8rem;
    color: var(--accent-color);
    text-align: center;
  }
}
</style>
