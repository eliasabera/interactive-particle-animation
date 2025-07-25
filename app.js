const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};
canvas.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particleArray.push(new Particle());
  }
})

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50% )";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// function drawCircle() {
//   ctx.fillStyle = "red";
//   ctx.strokeStyle = "green";
//   ctx.beginPath();
//   ctx.arc(mouse.x,mouse.y, 50, 0, Math.PI * 2);
//   ctx.fill()

// }

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();

    for (let j = i; j < particleArray.length; j++){
      const dx=particleArray[i].x - particleArray[j].x
      const dy = particleArray[i].y - particleArray[j].y
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        ctx.moveTo(particleArray[j].x, particleArray[j].y)
        ctx.lineTo(particleArray[i].x,particleArray[i].y)
        ctx.stroke();
        ctx.closePath()
      }
    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = 'rgba(0,0,0,0.1)';
  // ctx.fillRect(0,0,canvas.width,canvas.height)
  handleParticle();
  hue++;
  requestAnimationFrame(animate);
}
animate();
