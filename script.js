// Select elements
const form = document.getElementById("feedbackForm");
const successMessage = document.getElementById("successMessage");
const feedbackDisplay = document.getElementById("feedbackDisplay");

// When page loads, show saved feedback
window.onload = function () {
    displayFeedback();
};

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop form from refreshing page

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation: Name should not be empty
    if (name === "") {
        alert("Name cannot be empty!");
        return;
    }

    // Validation: Email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Create feedback object
    const feedback = {
        name: name,
        email: email,
        message: message
    };

    // Get existing feedback from localStorage
    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

    // Add new feedback
    feedbackList.push(feedback);

    // Save back to localStorage
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

    // Show success message
    successMessage.textContent = "🎉 Feedback submitted successfully!";

    // Clear form
    form.reset();

    // Update displayed feedback
    displayFeedback();
});

function displayFeedback() {
    // Get stored feedback
    const feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

    // Reset display section
    feedbackDisplay.innerHTML = "<h3>Submitted Feedback</h3>";

    // Loop through feedback and display
    feedbackList.forEach(function (item) {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${item.name}</strong> (${item.email})</p>
            <p>${item.message}</p>
            <hr>
        `;
        feedbackDisplay.appendChild(div);
    });
}