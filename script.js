function openTab(evt, tabName) {
    // Hide all tabs
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    // Remove "active" class from all buttons
    const navBtns = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navBtns.length; i++) {
        navBtns[i].classList.remove("active");
    }

    // Show current tab and mark button as active
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Typing Effect
const texts = ["Computer Vision Enthusiast", "Java Developer", "AI Builder"];
let count = 0, index = 0;

function type() {
    if (count === texts.length) count = 0;
    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);
    document.getElementById("typing").textContent = letter;

    if (letter.length === currentText.length) {
        count++; index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

document.addEventListener("DOMContentLoaded", type);
