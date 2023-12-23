<script setup lang="ts">
const props = defineProps<{
  label: string
  items: any[]
  modelValue: string | Object
  value?: string
  name?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | Object): void
  (e: 'change'): void
}>()
const changeHandler = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
  emit('change')
}
</script>

<template>
  <label>
    <span class="select-title">{{ label }}</span>
    <select @change="changeHandler">
      <option
        v-for="item in items"
        :value="value ? item[value] : item"
        :key="item"
      >
        {{name ? item[name] : item}}
      </option>
    </select>
  </label>
</template>

<style scoped lang="scss">
label {
  display: flex;
  align-items: center;
  gap: 1rem;

  font: var(--note-font);

  select {
    flex-grow: 1;
    padding: 0 1rem;
    height: 100%;
    font: inherit;
    background: transparent;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: .5rem;
    option {
      background-color: var(--accent-bg);
    }
  }
}
</style>
