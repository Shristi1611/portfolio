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
    // Create the string letter by letter
    letter = currentText.slice(0, ++index);

    document.getElementById("typing").textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Wait 2 seconds before next word
    } else {
        setTimeout(type, 100);  // Typing speed (100ms)
    }
}

// Start the typing effect when the page loads
document.addEventListener("DOMContentLoaded", type);
