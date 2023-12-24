<script setup lang="ts">
const props = defineProps<{
  type?: "text"
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const inputHandler = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value)
}
</script>

<template>
  <label>
    <input
      :type="props.type || 'text'"
      :value="modelValue"
      :placeholder="props.placeholder"
      class="text-field"
      @input="inputHandler"
    />
  </label>
</template>

<style scoped lang="scss">
.text-field {
  width: 100%;
  outline: none;
  padding: .6rem 1.5rem;
  transition: all .4s;
  background: transparent;
  border-radius: .5rem;

  font: var(--note-font);
  color: var(--accent-color);
  border: 1px solid var(--accent-color);

  &::placeholder {
    transition: all 0.3s;
    color: var(--accent-color);
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
}
</style>
