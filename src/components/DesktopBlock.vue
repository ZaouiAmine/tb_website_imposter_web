<template>
  <div
    v-if="isDesktop"
    class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1b2e] px-6"
  >
    <div class="rounded-3xl bg-[#16213e] p-8 shadow-xl text-center max-w-sm">
      <h2 class="font-display text-2xl font-semibold text-[#00d9ff] mb-4">
        Use your phone to play
      </h2>
      <p class="text-[#a0a0a0] text-base leading-relaxed">
        Imposter is designed for mobile. Open this link on your phone to join the party.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDesktop = ref(false)

function check() {
  isDesktop.value = typeof window !== 'undefined' && window.innerWidth > 768
}

onMounted(() => {
  check()
  window.addEventListener('resize', check)
})
</script>
