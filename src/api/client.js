const API_BASE = import.meta.env.VITE_API_URL || ''

export async function createRoom() {
  const res = await fetch(`${API_BASE}/api/rooms`, { method: 'POST' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function joinRoom(code, name) {
  const res = await fetch(`${API_BASE}/api/rooms/${code}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getRoom(code) {
  const res = await fetch(`${API_BASE}/api/rooms/${code}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function startGame(code, { imposters, mode, language }) {
  const res = await fetch(`${API_BASE}/api/rooms/${code}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imposters, mode, language })
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function sendMessage(code, playerId, text) {
  const res = await fetch(`${API_BASE}/api/rooms/${code}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId, text })
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function advancePhase(code) {
  const res = await fetch(`${API_BASE}/api/rooms/${code}/advance`, { method: 'POST' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function vote(code, voterId, targetId) {
  const res = await fetch(`${API_BASE}/api/rooms/${code}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voterId, targetId })
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getWebSocketUrl(roomCode) {
  const res = await fetch(`${API_BASE}/api/ws?room=${roomCode}`)
  if (!res.ok) throw new Error(await res.text())
  const path = (await res.text()).trim()
  const origin = API_BASE ? new URL(API_BASE).origin : window.location.origin
  const wsOrigin = origin.replace(/^http/, 'ws')
  return path.startsWith('/') ? `${wsOrigin}${path}` : `${wsOrigin}/${path}`
}
