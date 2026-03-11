<template>
  <div class="space-y-6 text-center">
    <div
      class="rounded-3xl p-8"
      :class="civiliansWon ? 'bg-[#7bed9f]/20 border-2 border-[#7bed9f]' : 'bg-[#ff6b6b]/20 border-2 border-[#ff6b6b]'"
    >
      <h2 class="font-display text-2xl font-bold mb-2" :class="civiliansWon ? 'text-[#7bed9f]' : 'text-[#ff6b6b]'">
        {{ civiliansWon ? 'Civilians win!' : 'Imposters win!' }}
      </h2>
      <p class="text-[#a0a0a0]">
        {{ votedPlayer?.name || 'Someone' }} was
        {{ votedPlayerRole === 'imposter' ? 'the imposter' : 'a civilian' }}.
      </p>
    </div>

    <WordCard v-if="myWord" :word="myWord" />

    <div v-if="pairId" class="rounded-2xl bg-[#16213e]/60 p-6">
      <p class="text-[#a0a0a0] text-sm mb-3">Rate this word pair</p>
      <div class="flex gap-2 justify-center">
        <button
          v-for="r in 5"
          :key="r"
          @click="rate(r)"
          :disabled="ratingDone"
          class="w-12 h-12 rounded-xl transition-all"
          :class="
            ratingDone && userRating === r
              ? 'bg-[#ffd93d] text-[#1a1b2e]'
              : 'bg-[#2a2b4e] text-[#a0a0a0] hover:bg-[#00d9ff]/30'
          "
        >
          {{ r }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WordCard from './WordCard.vue'

const props = defineProps({
  state: { type: Object, default: null },
  playerId: { type: String, default: '' }
})

const userRating = ref(0)
const ratingDone = ref(false)

const civiliansWon = computed(() => {
  const voted = props.state?.votes
  if (!voted) return false
  const targetId = Object.values(voted)[0]
  const player = (props.state?.players || []).find((p) => p.id === targetId)
  return player?.role === 'imposter'
})

const votedPlayer = computed(() => {
  const voted = props.state?.votes
  if (!voted || typeof voted !== 'object') return null
  const targets = Object.values(voted)
  if (!targets.length) return null
  const counts = {}
  targets.forEach((id) => { counts[id] = (counts[id] || 0) + 1 })
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
  return (props.state?.players || []).find((p) => p.id === top)
})

const votedPlayerRole = computed(() => votedPlayer.value?.role || 'civilian')

const myPlayer = computed(() =>
  (props.state?.players || []).find((p) => p.id === props.playerId)
)
const myWord = computed(() => myPlayer.value?.word || '')

const pairId = computed(() => props.state?.pairId || null)

async function rate(r) {
  if (ratingDone.value || !pairId.value) return
  userRating.value = r
  ratingDone.value = true
  try {
    await fetch(
      `${import.meta.env.VITE_API_URL || ''}/api/words/${pairId.value}/rate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: props.playerId, rating: r })
      }
    )
  } catch (_) {}
}
</script>
