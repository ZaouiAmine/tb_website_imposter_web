<template>
  <div class="rounded-3xl bg-[#16213e]/80 backdrop-blur p-6 shadow-xl border border-[#00d9ff]/20">
    <h2 class="font-display text-xl font-semibold text-[#00d9ff] mb-4">Create room</h2>
    <button
      @click="create"
      :disabled="loading"
      class="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d9ff] to-[#7bed9f] text-[#1a1b2e] font-semibold text-lg transition-transform active:scale-[0.98] disabled:opacity-60"
    >
      {{ loading ? 'Creating…' : 'Create room' }}
    </button>
    <p v-if="error" class="mt-3 text-sm text-[#ff6b6b]">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createRoom } from '../api/client'

const router = useRouter()
const loading = ref(false)
const error = ref('')

async function create() {
  loading.value = true
  error.value = ''
  try {
    const { code, hostId } = await createRoom()
    const playerId = hostId || `host-${Date.now()}`
    localStorage.setItem('playerId', playerId)
    router.push(`/room/${code}`)
  } catch (e) {
    error.value = e.message || 'Failed to create room'
  } finally {
    loading.value = false
  }
}
</script>
