// --- CUSTOM CURSOR ---
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = "1"; // Show only on first movement
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// --- BACK TO TOP BUTTON ---
let mybutton = document.getElementById("backToTop");
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};
mybutton.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

// --- PARTICLES ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function initParticles() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    particles = [];
    for(let i=0; i<50; i++) {
        particles.push({
            x: Math.random()*canvas.width, y: Math.random()*canvas.height,
            size: Math.random()*2+1, speedX: Math.random()*0.5-0.25, speedY: Math.random()*0.5-0.25
        });
    }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 105, 180, 0.4)';
    particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
initParticles(); animateParticles();

// --- TAB SYSTEM ---
function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) tabcontent[i].style.display = "none";
    let navlinks = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navlinks.length; i++) navlinks[i].classList.remove("active");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// --- TYPING ---
const texts = ["Software Engineer 🎀", "ML & CV Enthusiast", "Java & C++ Developer"];
let count = 0, index = 0;
function type() {
    if (count === texts.length) count = 0;
    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);
    document.getElementById("typing").textContent = letter;
    if (letter.length === currentText.length) { count++; index = 0; setTimeout(type, 2000); }
    else { setTimeout(type, 100); }
}
document.addEventListener("DOMContentLoaded", type);
