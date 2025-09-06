const canvas = document.getElementById('gameCanvas')
const reset = document.getElementById('resetBtn')
const ctx = canvas.getContext('2d')

canvas.width = 700
canvas.height = 300

let circles, arrows

// all these parameters are position from data.js

// function to reset
function resetApp() {
  circles = baseCircles.map((c) => ({ ...c, hit: false }))
  arrows = baseArrows.map((a) => ({
    ...a,
    currentX: a.x,
    active: false,
    speed: 0,
  }))
}

function drawCircle(c) {
  ctx.beginPath()
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
  ctx.fillStyle = c.color
  ctx.fill()

  // boundry to the circle
  ctx.lineWidth = 2
  ctx.strokeStyle = 'black'
  ctx.stroke()

  ctx.closePath()
}

// drawuuing arrow
function drawArrow(a) {
  // head
  ctx.beginPath()
  ctx.moveTo(a.currentX, a.y)
  ctx.lineTo(a.currentX + 15, a.y - 10)
  ctx.lineTo(a.currentX + 15, a.y + 10)
  ctx.closePath()
  ctx.fillStyle = 'black'
  ctx.fill()

  // line
  ctx.beginPath()
  ctx.moveTo(a.currentX + 15, a.y)
  ctx.lineTo(a.currentX + 50, a.y)
  ctx.lineWidth = 4
  ctx.strokeStyle = 'black'
  ctx.stroke()
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // to draw circle
  circles.forEach(drawCircle)

  // for loop to move the arrow and change color
  arrows.forEach((a, i) => {
    if (a.active) {
      a.currentX -= a.speed
      const c = circles[i]
      if (a.currentX <= c.x + c.r) {
        a.active = false
        c.color = 'gray'
        c.hit = true
      }
    }
    drawArrow(a)
  })

  requestAnimationFrame(animate)
}

// event listener to detect when we click on circle
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  circles.forEach((c, i) => {
    const dx = mouseX - c.x
    const dy = mouseY - c.y
    if (Math.sqrt(dx * dx + dy * dy) < c.r) {
      if (!arrows[i].active && !c.hit) {
        arrows[i].active = true
        arrows[i].speed = 3
      }
    }
  })
})

// adding event listener on reset button
reset.addEventListener('click', resetApp)
resetApp()
animate()
