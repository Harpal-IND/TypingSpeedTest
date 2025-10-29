let timeLeft = 60;
let timer = null;
let started = false;
let correctChars = 0;
let totalTyped = 0;
let errors = 0;
let givenText = "";

// DOM Elements
const givenTextElement = document.getElementById("givenText");
const typingArea = document.getElementById("typingArea");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const errorDisplay = document.getElementById("errors");
const progressBar = document.getElementById("timeProgress");
const timeText = document.getElementById("timeText");

// 🧠 Long paragraphs for 1-minute typing
const paragraphs = [
    "The quick brown fox jumps over the lazy dog, but the story does not end there. Every day brings a new opportunity to learn, grow, and improve. Typing quickly and accurately is a skill that combines focus, rhythm, and confidence. As you continue, remember that practice makes perfect, and persistence leads to mastery. So take a deep breath, relax your fingers, and keep typing smoothly without worrying about mistakes. The goal is not speed alone, but precision and consistency over time. Stay focused and enjoy the process of getting better with every word you type.",

    "Technology has changed the way we communicate, learn, and work. From powerful computers to smart devices, we now live in a world where information travels at the speed of light. Yet, the most important skill remains the same — the ability to type and express ideas clearly. A good typist blends accuracy with rhythm, turning thoughts into words that flow effortlessly across the screen.",

    "Once upon a time, in a small village surrounded by mountains, there lived a young dreamer who believed that hard work could change destiny. Every morning, they woke up before sunrise to practice their craft, knowing that each day was a new chance to improve. Like typing, success came not from speed, but from steady persistence and a heart full of hope.",

    "Data is the new oil of the digital world. Companies and individuals rely on information to make smart decisions. Learning to type efficiently helps you interact with this world faster, giving you an edge in both speed and clarity. Every word you type brings you closer to mastering digital fluency.",

    "Life is like typing a long paragraph — you may make mistakes, but you can always press backspace and start again. Success isn’t about never failing; it’s about learning from errors and continuing with more confidence. Just like in typing, rhythm and patience make all the difference."
];

// 🎲 Function to get random paragraph
function getRandomParagraph() {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

// 🎨 Render text with spans for per-character highlighting
function renderGivenText(text) {
    givenTextElement.innerHTML = "";
    for (let ch of text) {
        const span = document.createElement("span");
        span.textContent = ch;
        givenTextElement.appendChild(span);
    }
}

// Button events
document.getElementById("startBtn").addEventListener("click", startTest);
document.getElementById("resetBtn").addEventListener("click", resetTest);
document.getElementById("nextBtn")?.addEventListener("click", nextTest); // optional

function startTest() {
    // 🆕 Always generate new paragraph before enabling typing
    givenText = getRandomParagraph();
    renderGivenText(givenText);

    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();

    started = true;
    timeLeft = 60;
    correctChars = 0;
    totalTyped = 0;
    errors = 0;

    updateDisplay();
    updateProgress();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

// 🕒 Timer update
function updateTimer() {
    timeLeft--;
    updateProgress();
    if (timeLeft <= 0) endTest(false);
}

// 📊 Update progress bar
function updateProgress() {
    const percentage = (timeLeft / 60) * 100;
    progressBar.style.width = percentage + "%";
    progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");
    if (percentage > 50) progressBar.classList.add("bg-success");
    else if (percentage > 20) progressBar.classList.add("bg-warning");
    else progressBar.classList.add("bg-danger");
    timeText.innerText = `${timeLeft}s`;
}

// ✍️ Typing logic
typingArea.addEventListener("input", () => {
    if (!started) return;

    const typedText = typingArea.value;
    totalTyped = typedText.length;
    errors = 0;

    const spans = givenTextElement.querySelectorAll("span");
    spans.forEach((span, index) => {
        const char = typedText[index];
        if (char == null) {
            span.classList.remove("text-success", "text-danger");
        } else if (char === span.textContent) {
            span.classList.add("text-success");
            span.classList.remove("text-danger");
        } else {
            span.classList.add("text-danger");
            span.classList.remove("text-success");
            errors++;
        }
    });

    correctChars = totalTyped - errors;
    const timeUsed = 60 - timeLeft;
    const words = typedText.trim().split(/\s+/).filter(Boolean).length;
    const wpm = timeUsed > 0 ? Math.round(words / (timeUsed / 60)) : 0;
    const accuracy = totalTyped > 0 ? ((correctChars / totalTyped) * 100).toFixed(1) : 100;

    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy + "%";
    errorDisplay.innerText = errors;

    // Stop automatically when paragraph complete
    if (typedText.trim() === givenText.trim()) {
        endTest(true);
    }

    // Color accuracy dynamically
    accuracyDisplay.classList.remove("text-success", "text-warning", "text-danger");
    if (accuracy > 85) accuracyDisplay.classList.add("text-success");
    else if (accuracy > 60) accuracyDisplay.classList.add("text-warning");
    else accuracyDisplay.classList.add("text-danger");
});

// 🛑 End test
function endTest(finishedEarly = false) {
    clearInterval(timer);
    typingArea.disabled = true;
    started = false;
    timeText.innerText = finishedEarly ? "✅ Great job!" : "⏰ Time's up!";
}

// 🔁 Next paragraph
function nextTest() {
    clearInterval(timer);
    startTest(); // just restart flow
}

// ♻️ Reset everything
function resetTest() {
    clearInterval(timer);
    typingArea.value = "";
    typingArea.disabled = true;
    started = false;
    timeLeft = 60;
    correctChars = 0;
    totalTyped = 0;
    errors = 0;
    givenTextElement.innerHTML = "Click 'Start Test' to begin!";
    updateProgress();
    updateDisplay();
}

// Update score display
function updateDisplay() {
    wpmDisplay.innerText = 0;
    accuracyDisplay.innerText = "100%";
    errorDisplay.innerText = 0;
}
