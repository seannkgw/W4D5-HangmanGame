// Initialize ALL global variables here
// allTheWords = []
// This code here selects a random word
const wordList = [
  "vis",
  "toeter",
  "developer",
  "telefoon",
  "moeder",
  "snoer",
  "geeuw",
  "steil",
  "boodschappentas",
  "gezelligheid",
  "noorden",
  "academisch",
  "zusters",
  "snorkel",
  "kayak",
  "paraplu",
  "mondkapje",
  "corona",
  "botermesje",
  "handtas",
  "product",
  "accent",
  "stijlkeuze",
  "mode",
  "schot",
  "lynx",
  "supermarkt",
  "hamburger",
  "kamerplant",
  "schilderij",
  "design",
  "programmeur",
  "voetbaluitzending",
  "woordkeuze",
  "vezels",
  "debat",
  "contact",
  "protest",
  "maandblad",
  "politiek",
  "solidariteit",
  "bewustzijn",
];
let maxAmount = 5;

// Random Word is Picked
let word;
const pickRandomWord = (wordArray) => {
  let randomIndex = Math.floor(Math.random() * wordArray.length);
  const randomWord = wordArray[randomIndex];
  return randomWord;
};

//  Update inputArray
const updateInputArray = (letter, inputArray) => {
  inputArray.push(letter);
  console.log(inputArray);
  return inputArray;
}

//  Retracts guessed letters from word
let inputArray;
const wordGuessed = (aRandomSplittedWord, inputArray) => {
  let remaining = aRandomSplittedWord.filter(function (letter) {
    return !inputArray.includes(letter);

  });
  return remaining.length === 0;
};

//  Remove value of Input
const clearInputValue = () => {
  document.querySelector("input").value = "";
};

const winTheGame = () => {
  document.querySelector("#modal").style.display = "block";
  document.querySelector(".win").style.display = "block";
  gameOver = true;
};

const loseTheGame = () => {
  document.querySelector("#modal").style.display = "block";
  document.querySelector(".lose").style.display = "block";
  gameOver = true;
};


//  Show random word in DOM
const showRandomWordInDom = (randomWord) => {
  document.querySelector(".lose p span").innerHTML = `${randomWord.join("")}`;
};

//  Show remaing amount of tries in DOM
const updateTriesDisplay = (tries) => {

  document.querySelector(".lives span").innerHTML = 5 - tries;
  return tries;
};

//  Show letters that are guessed incorrect in DOM
const lettersGuessedIncorrect = (aRandomSplittedWord, inputArray) => {
  let wrongLetters = inputArray.filter((letter) => {
    return !aRandomSplittedWord.includes(letter);

  });
  document.querySelector(".guessed_letters").innerHTML = wrongLetters.join(" ");
};

//  Show letters guessed correctly
const lettersGuessedCorrect = (aRandomSplittedWord, inputArray) => {
  let wordDisplay = aRandomSplittedWord.map((letter) => {
    if (inputArray.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });
  document.querySelector(".the_word").innerHTML = wordDisplay.join(" ");
};

//  Guessing the correct word
const enterLetters = () => {
  if (gameOver) {
    return;
  }
  const guessedLetter = document.querySelector("input").value;
  clearInputValue();

  if (inputArray.includes(guessedLetter) || guessedLetter === "") {
    return;
  }

  if (!word.includes(guessedLetter)) {
    tries++;
    updateTriesDisplay(tries);
    console.log(tries)
  }


  updateInputArray(guessedLetter, inputArray);
  lettersGuessedCorrect(word, inputArray);
  lettersGuessedIncorrect(word, inputArray);
  if (wordGuessed(word, inputArray)) {
    winTheGame();
  } else if (tries >= 5) {
    loseTheGame();
  }

  // --> This is to make the modal screen close <-----
  const modal = document.getElementById("modal");
  const closebutton = document.getElementsByClassName("close")[0];
  closebutton.addEventListener("click", () => {
    modal.style.display = "none";
    beginTheGame();
  })

  const number = tries
  const addDrawing = () => {
    const drawinglocation = document.querySelector('.drawing')
    const newImg = document.createElement('img')
    newImg.src = `images/Hangman${number}.png`
    drawinglocation.innerHTML = ""
    drawinglocation.appendChild(newImg);
  }
  addDrawing();
};

function beginTheGame() {
  gameOver = false;
  document.querySelector(".win").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  clearInputValue();

  word = pickRandomWord(wordList).split("");
  showRandomWordInDom(word);
  tries = 0;
  updateTriesDisplay(tries);

  inputArray = [];
  lettersGuessedCorrect(word, inputArray);
  lettersGuessedIncorrect(word, inputArray);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".guess").addEventListener("click", enterLetters);

  document
    .querySelector(".restart")
    .addEventListener("click", beginTheGame);
  beginTheGame();
});


module.exports = { pickRandomWord, lettersGuessedCorrect, updateTriesDisplay, updateInputArray, loseTheGame, winTheGame, }

