console.log("script loaded")

const canvas = document.querySelector("#gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 900
canvas.height = 500

ctx.fillStyle = "rgb(187, 187, 187)"
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = "#111"
ctx.font = "30px Arial"
ctx.fillText("canvas ready", 14, 28)