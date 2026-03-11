<template>
  <div class="min-h-[100dvh] px-6 py-8">
    <div v-if="!state && !error" class="flex justify-center py-12">
      <p class="text-[#a0a0a0]">Connecting…</p>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-[#ff6b6b] mb-4">{{ error }}</p>
      <p class="text-[#a0a0a0] text-sm">Make sure the game server is running.</p>
    </div>
    <div v-else>
      <Lobby :code="code" :state="state" :player-id="playerId" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRoomWebSocket } from '../composables/useRoomWebSocket'
import Lobby from '../components/Lobby.vue'

const route = useRoute()
const code = route.params.code

const { state, error } = useRoomWebSocket(code)
const playerId = computed(() => localStorage.getItem('playerId') || '')
</script>
