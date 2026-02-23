window.onload = () => {
    // --- CURSOR ---
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = "1";
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // --- TYPING ---
    const typingElement = document.getElementById("typing");
    const texts = ["Software Engineer 🎀", "ML & CV Specialist", "Java Developer"];
    let count = 0, index = 0, currentText = "", letter = "";

    function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        if (typingElement) typingElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++; index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    }
    type();

    // --- PARTICLES ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;

    for(let i=0; i<40; i++) {
        particles.push({
            x: Math.random()*canvas.width, y: Math.random()*canvas.height,
            size: Math.random()*2+1, speedX: Math.random()*0.4-0.2, speedY: Math.random()*0.4-0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 105, 180, 0.2)';
        particles.forEach(p => {
            p.x += p.speedX; p.y += p.speedY;
            if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
};

function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) tabcontent[i].style.display = "none";
    let navlinks = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navlinks.length; i++) navlinks[i].classList.remove("active");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

const feedbackForm = document.getElementById('feedbackForm');
if(feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        if (name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            feedbackForm.style.display = "none";
            document.getElementById('successMessage').classList.add('visible');
        }
    });
}
