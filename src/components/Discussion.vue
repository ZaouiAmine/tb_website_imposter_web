<template>
  <div class="space-y-4">
    <div class="rounded-2xl bg-[#16213e]/60 p-4 max-h-48 overflow-y-auto">
      <p
        v-for="(m, i) in (state?.messages || [])"
        :key="i"
        class="text-sm py-1 text-[#e0e0e0]"
      >
        <span class="text-[#00d9ff] font-medium">{{ m.playerName || 'Someone' }}:</span> {{ m.text }}
      </p>
      <p v-if="!(state?.messages?.length)" class="text-[#6a6b8e] text-sm">No messages yet. {{ modeLabel }}</p>
    </div>
    <form @submit.prevent="send" class="flex gap-2">
      <input
        v-model="input"
        type="text"
        :placeholder="modePlaceholder"
        maxlength="200"
        class="flex-1 px-4 py-3 rounded-2xl bg-[#16213e] border-2 border-[#2a2b4e] text-white placeholder-[#6a6b8e] focus:border-[#00d9ff] focus:outline-none"
      />
      <button
        type="submit"
        :disabled="!input.trim()"
        class="px-6 py-3 rounded-2xl bg-[#00d9ff] text-[#1a1b2e] font-semibold transition-transform active:scale-95 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { sendMessage } from '../api/client'

const props = defineProps({
  code: { type: String, required: true },
  state: { type: Object, default: null },
  playerId: { type: String, default: '' }
})

const input = ref('')

const mode = computed(() => props.state?.mode || 'hint')
const modeLabel = computed(() =>
  mode.value === 'hint' ? 'Give a hint about your word.' : 'Ask a question.'
)
const modePlaceholder = computed(() =>
  mode.value === 'hint' ? 'Give a hint…' : 'Ask a question…'
)

async function send() {
  const text = input.value.trim()
  if (!text || !props.playerId) return
  try {
    await sendMessage(props.code, props.playerId, text)
    input.value = ''
  } catch (_) {}
}
</script>
