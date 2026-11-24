const audio = new Audio(
  `${import.meta.env.BASE_URL}sounds/audio.ogg`
)

audio.preload = 'auto'

const segments = [
  [0, 0.225],
  [0.225, 0.175],
  [0.400, 0.175]
]

export function playKeySound() {
  try {
    const sound = audio.cloneNode()

    const [start, duration] =
      segments[Math.floor(Math.random() * segments.length)]

    sound.volume = 0.65
    sound.currentTime = start

    sound.play().then(() => {
      setTimeout(() => {
        sound.pause()
      }, duration * 1000)
    }).catch(() => {})
  } catch {
    // Keep navigation working if audio fails.
  }
}