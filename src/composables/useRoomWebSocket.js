import { ref, onUnmounted } from 'vue'
import { getWebSocketUrl, getRoom } from '../api/client'

export function useRoomWebSocket(roomCode) {
  const state = ref(null)
  const connected = ref(false)
  const error = ref(null)
  let ws = null
  let reconnectTimer = null

  async function connect() {
    if (!roomCode) return
    try {
      const url = await getWebSocketUrl(roomCode)
      ws = new WebSocket(url)
      ws.onmessage = (e) => {
        try {
          state.value = JSON.parse(e.data)
        } catch (_) {}
      }
      ws.onopen = () => {
        connected.value = true
        error.value = null
        getRoom(roomCode).then((r) => { state.value = r }).catch(() => {})
      }
      ws.onclose = () => {
        connected.value = false
        reconnectTimer = setTimeout(connect, 2000)
      }
      ws.onerror = () => {
        error.value = 'Connection error'
      }
    } catch (e) {
      error.value = e.message
      state.value = await getRoom(roomCode).catch(() => null)
    }
  }

  function disconnect() {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    if (ws) {
      ws.close()
      ws = null
    }
    connected.value = false
  }

  connect()

  onUnmounted(disconnect)

  return { state, connected, error, reconnect: connect }
}
