const functions = require("./script.js");
const pickRandomWord = functions.pickRandomWord;
const lettersGuessedCorrect = functions.lettersGuessedCorrect;
const updateTriesDisplay = functions.updateTriesDisplay;
const updateInputArray = functions.updateInputArray;
const loseTheGame = functions.loseTheGame;
const winTheGame = functions.winTheGame;


// Test 1. Starten van de game d.m.v. het kiezen van het woord
test("When game starts a random word is picked", function () {
  const wordList = ["vis", "toeter", "developer"];
  expect(pickRandomWord(wordList)).not.toBe(null);
})


// Test 2. Checken of een letter voorkomt in het woord
test("Word contains this letter", function () {

  document.body.innerHTML = "<div class='the_word'>" + "_ _ _ _ _</div>";

  const randomWord = "fruithapje";
  const wordSplitUp = randomWord.split("");
  const testArray = ["f", "u", "h"];
  lettersGuessedCorrect(wordSplitUp, testArray);
  let myDivText = document.querySelector(".the_word").innerHTML;

  expect(myDivText).toEqual("f _ u _ _ h _ _ _ _");
})


// Test 3. Updaten van het aantal pogingen van de gebruiker
test("Amount of tries is updated", function () {
  document.body.innerHTML = "<p class='lives'>Lives remaining:<br><span></span></p>"
  let tries = 2;

  const output = updateTriesDisplay(tries);
  let spanHTML = document.querySelector(".lives span").innerHTML;

  expect(output).toBe(2);
  expect(spanHTML).toBe("3");
})


// Test 4. Updaten van de lijst met letters die al geraden zijn door de gebruiker
test("List containing correctly guessed letters is updated", function () {

  const inputLetter = "b";
  let inputArray = ["c", "f"];
  const output = updateInputArray(inputLetter, inputArray);

  expect(output).toEqual(expect.arrayContaining(["b"]))
})


// Test 5. Verliezen van de game wanneer er geen pogingen meer over zijn
test("When player loses game show loseDiv", function () {

  document.body.innerHTML = `<div class="lose" style="display: none;" ><div id="modal" style="display: none;">`;
  let loseDiv = document.querySelector(".lose");
  let modalScreen = document.querySelector("#modal");
  loseTheGame();

  expect(loseDiv.style.display).toBe("block");
  expect(modalScreen.style.display).toBe("block");
})


// Test 6. Winnen van de game
test("When player wins the game show winDiv and modal", function () {

  document.body.innerHTML = `<div class= "win" style="display: none;" ><div id="modal" style="display: none;">`;
  let winDiv = document.querySelector(".win");
  let modalScreen = document.querySelector("#modal");
  winTheGame();

  expect(winDiv.style.display).toBe("block");
  expect(modalScreen.style.display).toBe("block");
})
