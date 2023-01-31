import './style.css'
document.querySelector('#app').innerHTML = `
  <div id="game-container">
    <h1>Blackjack</h1>
    <p id="message-el">Want to play a round?</p>
    <p>Cards:</p>
    <p id="sum-el">Sum:</p>
    <button id="start">START GAME</button>
  </div>
`
let firstCard = setRandomNum();
let secondCard = setRandomNum();
let sum = firstCard + secondCard;
let message = ''
let hasBlackJack = false;
let isAlive = true;
let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');

function setRandomNum(){
  return Math.floor(Math.random() * 10) + 2;
}

function startGame(){
  console.log('clicked start game')
  if (sum <= 20) {
      message = "Do you want to draw a new card?"
  } else if (sum === 21) {
      message = "You've got Blackjack!"
      hasBlackJack = true
  } else {
      message = "You're out of the game!"
      isAlive = false
  }
  messageEl.textContent = message; 
  sumEl.textContent = "Sum: " + sum;
}



document.getElementById('start').addEventListener('click', startGame);
// console.log(`${firstCard}, ${secondCard}`)
// console.log(hasBlackJack)