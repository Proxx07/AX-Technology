<script setup lang="ts">
const theme = ref<string>(localStorage.getItem("theme") || "dark")
const toggleTheme = () => {
  const currentTheme = theme.value === "dark" ? "light" : "dark"
  localStorage.setItem("theme", currentTheme)
  theme.value = currentTheme
}

useHead({
  bodyAttrs: {
    class: computed(() => theme.value)
  },
});
</script>

<template>
  <button class="theme-toggler" @click="toggleTheme"/>
</template>

<style scoped lang="scss">
.theme-toggler {
  position: fixed;
  width: 35px;
  height: 35px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGSSURBVEiJzdS9ahRRGAbgZyWFENDdZlJYbaMBTSPYaaUWQWKh2Hsbaukt2AgpYmGVXIKxcWNpE2LSCNYWkjTayI7FOWPOjnMyZwTFFz6YM3z/Py//EUbYwfbfCjBGHWVcanRuQIBR5nsw3uII045k9vCuI8A02uyWBDgS2vAZVfJ/DQ+jrCX/V6JujcOSANPE4DbuR8Om/6/xEjNs4E6SULvqLKro/BnmifMaj6PORWzhSdSt2k7ID/kLlvFcfqAneIrLOB9tBiFtS1cFcB2XhMF3Iq1gEmUkDHG1IIkPuBWTuRr9NX4WAuzga5QZrhQ4b/AJ+zGhWeJnOw1QJwZ1692Hb0LVzTI0mMNSfDwSzn+EY6HcUqwKLX2Dm04p5bjP8KP+Id8Qtig75LOw4fcbaAe4gFdYzznJ3UGF78Kh5eYxxguh0h8yh9aFNlXcw4FFqtgU2rKOuwZSRY7sruFBlHQJKgPJbjcqdtH1e4Gyu+j6UNikP8bEaZsmPboLWZWifYxFWOpX+YUTgVLmCo7on+En05lyK9PN6sUAAAAASUVORK5CYII=');
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: 50%;
  background-size: auto 20px;
  cursor: pointer;
  border: 1px solid var(--accent-color);
  border-radius: .5rem;
  bottom: 3rem;
  left: 3rem;

  z-index: 100;
}
</style>
