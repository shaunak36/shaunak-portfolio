
const audioUrl =
  `${import.meta.env.BASE_URL}sounds/audio.ogg`

const segments = [
  [0, 0.225],
  [0.225, 0.175],
  [0.400, 0.175]
]

let audioContext = null
let audioBuffer = null
let loadingPromise = null

async function unlockAudio() {
  try {
    if (!audioContext) {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext

      if (!AudioContext) return

      audioContext = new AudioContext()
    }

    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }

    if (!loadingPromise) {
      loadingPromise = fetch(audioUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Audio loading failed')
          }

          return response.arrayBuffer()
        })
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(buffer => {
          audioBuffer = buffer
        })
        .catch(() => {
          loadingPromise = null
        })
    }

    await loadingPromise

    if (audioContext.state === 'running' && audioBuffer) {
      window.removeEventListener('click', unlockAudio)
      window.removeEventListener('touchend', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
    }
  } catch {
    // Keep the website working if audio fails.
  }
}

// Unlock audio after the first user interaction
window.addEventListener('click', unlockAudio)
window.addEventListener('touchend', unlockAudio)
window.addEventListener('keydown', unlockAudio)

export function playKeySound() {
  try {
    if (
      !audioContext ||
      !audioBuffer ||
      audioContext.state !== 'running'
    ) {
      return
    }

    const [start, duration] =
      segments[Math.floor(Math.random() * segments.length)]

    const source = audioContext.createBufferSource()
    const gain = audioContext.createGain()

    source.buffer = audioBuffer
    gain.gain.value = 0.65

    source.connect(gain)
    gain.connect(audioContext.destination)

    source.onended = () => {
      source.disconnect()
      gain.disconnect()
    }

    source.start(0, start, duration)
  } catch {
    // Keep navigation working if audio fails.
  }
}
