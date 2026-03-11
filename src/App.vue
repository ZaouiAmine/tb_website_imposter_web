<template>
  <DesktopBlock />
  <main class="app-content">
    <router-view />
  </main>
</template>

<script setup>
import DesktopBlock from './components/DesktopBlock.vue'
</script>

<style scoped>
.app-content {
  display: block;
}

@media (min-width: 769px) {
  .app-content {
    visibility: hidden;
  }
}
</style>
