// Fallback word pairs for offline/demo; server is source of truth
import en from '../../data/words-en.json'
import fr from '../../data/words-fr.json'
import dz from '../../data/words-dz.json'

const pools = { en, fr, dz }

export function getRandomPair(lang = 'en') {
  const list = pools[lang] || pools.en
  const i = Math.floor(Math.random() * list.length)
  const [word1, word2] = list[i]
  return { word1, word2 }
}

export default pools
