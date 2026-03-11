<template>
  <div class="space-y-4">
    <p class="text-[#a0a0a0] text-center">Who do you think is the imposter?</p>
    <div class="grid gap-3">
      <button
        v-for="p in voteablePlayers"
        :key="p.id"
        @click="vote(p.id)"
        :disabled="loading || !!state?.votes?.[playerId]"
        class="w-full py-4 px-6 rounded-2xl bg-[#16213e] border-2 transition-all text-left"
        :class="
          selectedId === p.id
            ? 'border-[#ff6b6b] bg-[#ff6b6b]/10'
            : 'border-[#2a2b4e] hover:border-[#00d9ff]/50'
        "
      >
        <span class="font-medium text-white">{{ p.name }}</span>
      </button>
    </div>
    <p v-if="state?.votes?.[playerId]" class="text-sm text-[#7bed9f] text-center">Vote submitted. Waiting for others…</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { vote as voteApi } from '../api/client'

const props = defineProps({
  code: { type: String, required: true },
  state: { type: Object, default: null },
  playerId: { type: String, required: true }
})

const loading = ref(false)
const selectedId = ref('')

const voteablePlayers = computed(() => {
  const players = props.state?.players || []
  return players.filter((p) => p.id !== props.playerId)
})

async function vote(targetId) {
  if (loading.value || props.state?.votes?.[props.playerId]) return
  loading.value = true
  selectedId.value = targetId
  try {
    await voteApi(props.code, props.playerId, targetId)
  } catch (_) {
    selectedId.value = ''
  } finally {
    loading.value = false
  }
}
</script>
