// --- 1. CUSTOM CURSOR ---
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// --- 2. PINK PARTICLES ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 105, 180, 0.4)';
    particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
        if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);
initParticles(); animateParticles();

// --- 3. TABS & TYPING ---
function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) tabcontent[i].style.display = "none";
    let navlinks = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navlinks.length; i++) navlinks[i].classList.remove("active");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

const texts = ["Software Engineer 🎀", "ML & Computer Vision", "Java & C++ Developer", "Flutter Architect"];
let count = 0, index = 0;
function type() {
    if (count === texts.length) count = 0;
    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);
    document.getElementById("typing").textContent = letter;
    if (letter.length === currentText.length) { count++; index = 0; setTimeout(type, 2000); }
    else { setTimeout(type, 80); }
}

document.addEventListener("DOMContentLoaded", type);
