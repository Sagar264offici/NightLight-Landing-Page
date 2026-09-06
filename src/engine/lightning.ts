/** Lightning canvas — ported from the provided CoffeeScript reference.
 * Usage: import { initLightning } from './engine/lightning' then call initLightning(canvas).
 */

export function initLightning(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!

  let width = 0.0
  let height = 0.0
  const scale = 1.0

  const fps = 45.0
  let lastFrame = performance.now()

  let flashOpacity = 0.0

  const boltFlashDuration = 0.25
  const boltFadeDuration = 0.5
  const totalBoltDuration = boltFlashDuration + boltFadeDuration

  interface Bolt {
    canvas: HTMLCanvasElement
    duration: number
  }

  const bolts: Bolt[] = []

  function setCanvasSize() {
    canvas.setAttribute('width', String(window.innerWidth))
    canvas.setAttribute('height', String(window.innerHeight))

    for (const bolt of bolts) {
      bolt.canvas.width = window.innerWidth
      bolt.canvas.height = window.innerHeight
    }

    width = Math.ceil(window.innerWidth / scale)
    height = Math.ceil(window.innerHeight / scale)
  }

  function launchBolt(x: number, y: number, length: number, direction: number) {
    flashOpacity = 0.15 + Math.random() * 0.2

    const boltCanvas = document.createElement('canvas')
    boltCanvas.width = window.innerWidth
    boltCanvas.height = window.innerHeight
    const boltContext = boltCanvas.getContext('2d')!
    boltContext.scale(scale, scale)

    bolts.push({ canvas: boltCanvas, duration: 0.0 })

    recursiveLaunchBolt(x, y, length, direction, boltContext)
  }

  function recursiveLaunchBolt(
    x: number,
    y: number,
    length: number,
    direction: number,
    boltContext: CanvasRenderingContext2D,
  ) {
    const originalDirection = direction

    const boltInterval = setInterval(() => {
      if (length <= 0) {
        clearInterval(boltInterval)
        return
      }

      let i = 0
      while (i++ < Math.floor(45 / scale) && length > 0) {
        const x1 = Math.floor(x)
        const y1 = Math.floor(y)
        x += Math.cos(direction)
        y -= Math.sin(direction)
        length--

        if (x1 !== Math.floor(x) || y1 !== Math.floor(y)) {
          const alpha = Math.min(1.0, length / 350.0)
          boltContext.fillStyle = `rgba(255, 255, 255, ${alpha})`
          boltContext.fillRect(x1, y1, 1.0, 1.0)

          direction =
            originalDirection +
            (-Math.PI / 8.0 + Math.random() * (Math.PI / 4.0))

          if (Math.random() > 0.98) {
            recursiveLaunchBolt(
              x1,
              y1,
              length * (0.3 + Math.random() * 0.4),
              originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.0)),
              boltContext,
            )
          } else if (Math.random() > 0.95) {
            recursiveLaunchBolt(
              x1,
              y1,
              length,
              originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.0)),
              boltContext,
            )
            length = 0
          }
        }
      }

      return undefined
    }, 10)
  }

  function tick() {
    const frame = performance.now()
    const elapsed = (frame - lastFrame) / 1000
    lastFrame = frame

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    // Fire a bolt randomly.
    if (Math.random() > 0.985) {
      const x = Math.floor(-10 + Math.random() * (width + 20))
      const y = Math.floor(5 + Math.random() * (height / 3))
      const length = Math.floor(height / 2 + Math.random() * (height / 3))

      launchBolt(x, y, length, (Math.PI * 3) / 2)
    }

    // Draw the screen flash.
    if (flashOpacity > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      flashOpacity = Math.max(0, flashOpacity - 2 * elapsed)
    }

    // Draw each bolt.
    for (let i = 0; i < bolts.length; i++) {
      const bolt = bolts[i]
      bolt.duration += elapsed

      if (bolt.duration >= totalBoltDuration) {
        bolts.splice(i, 1)
        i--
        continue
      }

      ctx.globalAlpha = Math.max(
        0,
        Math.min(1, (totalBoltDuration - bolt.duration) / boltFadeDuration),
      )
      ctx.drawImage(bolt.canvas, 0, 0)
    }
  }

  window.addEventListener('resize', setCanvasSize)
  setCanvasSize()
  setInterval(tick, 1000 / fps)
}
