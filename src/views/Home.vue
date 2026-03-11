<template>
  <div class="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8">
    <h1 class="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#ffd93d] mb-2">
      Imposter
    </h1>
    <p class="text-[#a0a0a0] mb-8 text-center">Find the imposter. Play with friends.</p>
    <div class="w-full max-w-sm space-y-4">
      <CreateRoom />
      <JoinRoom />
    </div>
  </div>
</template>

<script setup>
import CreateRoom from '../components/CreateRoom.vue'
import JoinRoom from '../components/JoinRoom.vue'
</script>
