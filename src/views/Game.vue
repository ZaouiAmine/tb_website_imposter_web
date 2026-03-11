<template>
  <div class="min-h-[100dvh] px-6 py-8">
    <div v-if="!state && !error" class="flex justify-center py-12">
      <p class="text-[#a0a0a0]">Connecting…</p>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-[#ff6b6b]">{{ error }}</p>
    </div>
    <template v-else>
      <div class="flex justify-between items-center mb-6">
        <p class="text-[#ffd93d] font-medium">{{ phaseLabel }}</p>
        <p v-if="phase === 'discussion' && roundEndAt" class="text-[#00d9ff] font-mono">
          {{ formatTime(timeLeft) }}
        </p>
      </div>

      <div v-if="phase === 'discussion'" class="space-y-6">
        <WordCard :word="myWord" />
        <Discussion :code="code" :state="state" :player-id="playerId" />
      </div>

      <div v-else-if="phase === 'voting'" class="space-y-6">
        <Voting :code="code" :state="state" :player-id="playerId" />
      </div>

      <div v-else-if="phase === 'reveal'" class="space-y-6">
        <Result :state="state" :player-id="playerId" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRoomWebSocket } from '../composables/useRoomWebSocket'
import WordCard from '../components/WordCard.vue'
import Discussion from '../components/Discussion.vue'
import Voting from '../components/Voting.vue'
import Result from '../components/Result.vue'

const route = useRoute()
const code = route.params.code

const { state, error } = useRoomWebSocket(code)
const playerId = computed(() => localStorage.getItem('playerId') || '')

const phase = computed(() => state.value?.phase || 'lobby')
const phaseLabel = computed(() => {
  const p = phase.value
  if (p === 'discussion') return 'Discussion'
  if (p === 'voting') return 'Vote for the imposter'
  if (p === 'reveal') return 'Results'
  return ''
})

const roundEndAt = computed(() => state.value?.roundEndAt)
const timeLeft = ref(0)

watch(
  [roundEndAt, state],
  () => {
    const end = roundEndAt.value
    if (!end) return
    const tick = async () => {
      const left = Math.max(0, Math.floor(end - Date.now() / 1000))
      timeLeft.value = left
      if (left <= 0 && phase.value === 'discussion') {
        try {
          await import('../api/client.js').then((m) => m.advancePhase(code))
        } catch (_) {}
      } else if (left > 0) {
        setTimeout(tick, 1000)
      }
    }
    tick()
  },
  { immediate: true }
)

const myPlayer = computed(() =>
  (state.value?.players || []).find((p) => p.id === playerId.value)
)
const myWord = computed(() => myPlayer.value?.word || '')

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>
