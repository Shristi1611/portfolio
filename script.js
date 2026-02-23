/* Typing Effect */
const texts = [
    "Computer Vision Enthusiast",
    "Java Developer",
    "AI Builder",
    "Problem Solver"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
    if (count === texts.length) {
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById("typing").textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1200);
    } else {
        setTimeout(type, 80);
    }
}

type();

/* Scroll Reveal */
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }
    });
});

reveals.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.8s ease";
});
