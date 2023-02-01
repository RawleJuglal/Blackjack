import './style.css'
document.querySelector('#app').innerHTML = `
  <div id="game-container">
    <h1>Blackjack</h1>
    <p id="message-el">Want to play a round?</p>
    <p id="cards-el">Cards:</p>
    <p id="sum-el">Sum:</p>
    <p id="player-el"></p>
    <button id="start">START GAME</button>
    <button id="newCard">New Card</button>
  </div>
`

let cards = []
let player = {
  name:"Rawle",
  chips:145
}
let sum = 0
let message = ''
let hasBlackJack = false;
let isAlive = false;
let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let cardEl = document.getElementById('cards-el');
let playerEl = document.getElementById('player-el')
playerEl.textContent = `${player.name}: $${player.chips}`


function setRandomNum(){
  return Math.floor(Math.random() * 10) + 2;
}

function startGame(){
  isAlive = true;
  let firstCard = setRandomNum();
  let secondCard = setRandomNum();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function renderGame(){
  console.log('clicked start game')
  sumEl.textContent = "Sum: " + sum;
  cardEl.textContent = "Cards: "
  cards.map((item)=>{
    cardEl.textContent += " " + item
  })
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
 
}

function newCard(){
  console.log('Drawing a new card from the deck!')
  if(isAlive && !hasBlackJack){
    let newCard = setRandomNum();
    console.log(newCard)
    cards.push(newCard);
    sum += newCard;
    renderGame()
  }
  
}



document.getElementById('start').addEventListener('click', startGame);
document.getElementById('newCard').addEventListener('click', newCard);
// console.log(`${firstCard}, ${secondCard}`)
// console.log(hasBlackJack)