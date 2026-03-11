<template>
  <div class="space-y-6">
    <div class="rounded-3xl bg-[#16213e]/80 backdrop-blur p-6 border border-[#ffd93d]/20">
      <h3 class="font-display text-lg text-[#ffd93d] mb-2">Room code</h3>
      <p class="text-3xl font-mono tracking-[0.4em] text-white">{{ state?.code || code }}</p>
    </div>

    <div class="rounded-3xl bg-[#16213e]/80 backdrop-blur p-6 border border-[#2a2b4e]">
      <h3 class="font-display text-lg text-[#00d9ff] mb-3">Players ({{ (state?.players || []).length }})</h3>
      <ul class="space-y-2">
        <li
          v-for="p in (state?.players || [])"
          :key="p.id"
          class="flex items-center gap-3 py-2 px-4 rounded-xl bg-[#1a1b2e]"
        >
          <span class="w-3 h-3 rounded-full bg-[#7bed9f]"></span>
          <span class="text-white">{{ p.name }}</span>
        </li>
      </ul>
    </div>

    <div v-if="isHost" class="space-y-4">
      <div class="rounded-3xl bg-[#16213e]/80 backdrop-blur p-6 border border-[#2a2b4e]">
        <label class="block text-[#a0a0a0] text-sm mb-2">Imposters</label>
        <select
          v-model="imposters"
          class="w-full px-4 py-3 rounded-2xl bg-[#1a1b2e] border-2 border-[#2a2b4e] text-white focus:border-[#00d9ff] focus:outline-none"
        >
          <option v-for="n in Math.max(1, (state?.players?.length || 1) - 1)" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="rounded-3xl bg-[#16213e]/80 backdrop-blur p-6 border border-[#2a2b4e]">
        <label class="block text-[#a0a0a0] text-sm mb-2">Mode</label>
        <select
          v-model="mode"
          class="w-full px-4 py-3 rounded-2xl bg-[#1a1b2e] border-2 border-[#2a2b4e] text-white focus:border-[#00d9ff] focus:outline-none"
        >
          <option value="hint">Hint mode</option>
          <option value="question">Question mode</option>
        </select>
      </div>
      <div class="rounded-3xl bg-[#16213e]/80 backdrop-blur p-6 border border-[#2a2b4e]">
        <label class="block text-[#a0a0a0] text-sm mb-2">Language</label>
        <select
          v-model="language"
          class="w-full px-4 py-3 rounded-2xl bg-[#1a1b2e] border-2 border-[#2a2b4e] text-white focus:border-[#00d9ff] focus:outline-none"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="dz">Algerian Darija</option>
        </select>
      </div>
      <button
        @click="start"
        :disabled="loading || (state?.players?.length || 0) < 2"
        class="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d9ff] to-[#ffd93d] text-[#1a1b2e] font-semibold text-lg transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {{ loading ? 'Starting…' : 'Start game' }}
      </button>
      <p v-if="(state?.players?.length || 0) < 2" class="text-sm text-[#ffd93d] text-center">Need at least 2 players</p>
    </div>
    <p v-else class="text-[#a0a0a0] text-center">Waiting for host to start…</p>

    <p v-if="error" class="text-sm text-[#ff6b6b]">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { startGame } from '../api/client'

const props = defineProps({
  code: { type: String, required: true },
  state: { type: Object, default: null },
  playerId: { type: String, default: '' }
})

const router = useRouter()
const imposters = ref(1)
const mode = ref('hint')
const language = ref('en')
const loading = ref(false)
const error = ref('')

const isHost = computed(() => {
  return props.state?.hostId === props.playerId || !props.playerId
})

async function start() {
  loading.value = true
  error.value = ''
  try {
    await startGame(props.code, {
      imposters: Number(imposters.value),
      mode: mode.value,
      language: language.value
    })
    router.push(`/game/${props.code}`)
  } catch (e) {
    error.value = e.message || 'Failed to start'
  } finally {
    loading.value = false
  }
}
</script>
