<template>
  <div class="rounded-3xl bg-[#16213e]/80 backdrop-blur p-6 shadow-xl border border-[#7bed9f]/20">
    <h2 class="font-display text-xl font-semibold text-[#7bed9f] mb-4">Join room</h2>
    <input
      v-model="code"
      placeholder="Enter room code"
      maxlength="6"
      class="w-full px-4 py-3 rounded-2xl bg-[#1a1b2e] border-2 border-[#2a2b4e] text-white placeholder-[#6a6b8e] text-lg tracking-[0.2em] uppercase text-center mb-4 focus:border-[#7bed9f] focus:outline-none transition-colors"
    />
    <input
      v-model="name"
      placeholder="Your name"
      class="w-full px-4 py-3 rounded-2xl bg-[#1a1b2e] border-2 border-[#2a2b4e] text-white placeholder-[#6a6b8e] mb-4 focus:border-[#7bed9f] focus:outline-none transition-colors"
    />
    <button
      @click="join"
      :disabled="loading || !code.trim() || !name.trim()"
      class="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7bed9f] to-[#00d9ff] text-[#1a1b2e] font-semibold text-lg transition-transform active:scale-[0.98] disabled:opacity-60"
    >
      {{ loading ? 'Joining…' : 'Join' }}
    </button>
    <p v-if="error" class="mt-3 text-sm text-[#ff6b6b]">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { joinRoom } from '../api/client'

const router = useRouter()
const code = ref('')
const name = ref('')
const loading = ref(false)
const error = ref('')

async function join() {
  const c = code.value.trim().toUpperCase()
  const n = name.value.trim()
  if (!c || !n) return
  loading.value = true
  error.value = ''
  try {
    const { playerId } = await joinRoom(c, n)
    localStorage.setItem('playerId', playerId)
    router.push(`/room/${c}`)
  } catch (e) {
    error.value = e.message || 'Failed to join room'
  } finally {
    loading.value = false
  }
}
</script>
