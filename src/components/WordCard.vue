<template>
  <div
    ref="cardEl"
    class="relative w-full max-w-[280px] mx-auto rounded-3xl overflow-hidden touch-none select-none bg-[#16213e] border-2 border-[#2a2b4e]"
    style="height: 200px"
    @touchstart.passive="onStart"
    @touchmove.passive="onMove"
    @touchend="onEnd"
    @mousedown="onStart"
    @mousemove="onMove"
    @mouseup="onEnd"
    @mouseleave="onEnd"
  >
    <div
      class="absolute left-0 right-0 flex flex-col transition-transform duration-150 ease-out"
      :style="{ height: '200%', transform: `translateY(${revealOffset}px)` }"
    >
      <div class="h-1/2 flex items-center justify-center bg-gradient-to-b from-[#1a1b2e] to-[#16213e]">
        <span class="font-display text-xl font-semibold text-[#00d9ff]">???</span>
      </div>
      <div class="h-1/2 flex items-center justify-center bg-gradient-to-t from-[#0f3460] to-[#16213e]">
        <span class="font-display text-xl font-semibold text-[#7bed9f]">{{ word }}</span>
      </div>
    </div>
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#6a6b8e] text-xs pointer-events-none">
      Swipe up to peek
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  word: { type: String, default: '' }
})

const cardEl = ref(null)
const revealOffset = ref(0)
let startY = 0
let startOffset = 0
let isDragging = false
const CARD_HEIGHT = 200

function onStart(e) {
  e.preventDefault?.()
  const y = 'touches' in e ? e.touches[0].clientY : e.clientY
  startY = y
  startOffset = revealOffset.value
  isDragging = true
}

function onMove(e) {
  if (!isDragging) return
  const y = 'touches' in e ? e.touches[0].clientY : e.clientY
  const dy = startY - y
  let next = startOffset + dy
  if (next > 0) next = 0
  if (next < -CARD_HEIGHT) next = -CARD_HEIGHT
  revealOffset.value = next
}

function onEnd() {
  isDragging = false
  revealOffset.value = 0
}
</script>
