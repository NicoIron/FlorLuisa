const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = random(2, 4);
        this.color = color;
        this.speed = random(2, 6);
        this.angle = random(0, Math.PI * 2);
        this.friction = 0.98;
        this.gravity = 0.05;
        this.alpha = 1;
    }

    update() {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

function createFirework() {
    const x = random(100, canvas.width - 100);
    const y = random(50, canvas.height / 2);
    const color = `hsl(${random(45, 55)}, 100%, 60%)`; // tonos amarillos
    for (let i = 0; i < 30; i++) {
        fireworks.push(new Particle(x, y, color));
    }
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
        const p = fireworks[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) {
            fireworks.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

setInterval(createFirework, 1000);
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
