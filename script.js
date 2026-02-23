// 1. CUSTOM CURSOR
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = "1";
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// 2. PARTICLE SYSTEM
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for(let i=0; i<60; i++) {
        particles.push({
            x: Math.random()*canvas.width, y: Math.random()*canvas.height,
            size: Math.random()*2+1, speedX: Math.random()*0.6-0.3, speedY: Math.random()*0.6-0.3
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

// 3. TAB LOGIC
function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) tabcontent[i].style.display = "none";
    let navlinks = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navlinks.length; i++) navlinks[i].classList.remove("active");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// 4. FORM VALIDATION & LOCAL STORAGE
const feedbackForm = document.getElementById('feedbackForm');
const successMessage = document.getElementById('successMessage');

feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const message = document.getElementById('userMessage').value.trim();
    
    document.getElementById('nameError').textContent = "";
    document.getElementById('emailError').textContent = "";
    let isValid = true;

    if (name === "") {
        document.getElementById('nameError').textContent = "Name is required! 🎀";
        isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = "Enter a valid email.";
        isValid = false;
    }

    if (isValid) {
        const entry = { name, email, message, date: new Date().toLocaleString() };
        const storage = JSON.parse(localStorage.getItem('userFeedback')) || [];
        storage.push(entry);
        localStorage.setItem('userFeedback', JSON.stringify(storage));

        feedbackForm.style.display = "none";
        successMessage.classList.add('visible');
    }
});

// 5. BACK TO TOP
let topBtn = document.getElementById("backToTop");
window.onscroll = () => {
    topBtn.style.display = (window.scrollY > 300) ? "block" : "none";
};
topBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

// 6. TYPING EFFECT
const texts = ["Software Engineer 🎀", "ML & CV Specialist", "Java Developer"];
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

