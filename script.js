const word = document.getElementById("word"),
 text = document.getElementById("text"),
 settingsBtn = document.getElementById("settings-btn"),
 settings = document.getElementById("settings"),
 scoreElement = document.getElementById("score"),
 timeElement = document.getElementById("time"),
 settingsForm = document.getElementById("settingsForm"),
 difficultySelect = document.getElementById("difficulty"),
 endGameContainer = document.getElementById("end-game-box");

// List of words
const words = [
  "Paradigm ",
  "War ",
  "Nauseous",
  "Dilate",
  "Cryptography",
  "Nanotechnology",
  "ambidextrous",
  "ballin",
  "Abstemious ",
  "Get ",
  "highfalutin",
  "Fastidious ",
  "Fr",
  "Ineffable ",
  "Design ",
  "bussin!",
  "Clam",
  "Beasted",
  "No-cap",
  "Quinoa",
  "wRizz",
  "Serenity  ",
  "recession",
  "integrity",
  "Easy ",
  "magnitude",
  "Prime",
  "environmental",
  "Sequoia",
  "Altruism",
];

let score = 0;

let randomWord;

let time = 10;


let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";


difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// start on focus
text.focus();


const timeInterval = setInterval(updateTime, 1000);

// creating function to get random words
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//  updating score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// Updating time
function updateTime() {
  time--;
  timeElement.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGameContainer.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your Final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endGameContainer.style.display = "flex";
}

// add word to dom
function addWordDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordDom();

// Event Listners
//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  console.log(insertedText);

  if (insertedText === randomWord) {
    addWordDom();
    updateScore();

    // to Clear text input
    e.target.value = "";
    
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
