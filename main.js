import './style.css'

let isLoading = true;
let deck;
let cards;
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res=>res.json())
  .then(data=>{
    isLoading = false;
    deck = data;
    return data;
  })

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

function checkForValue(val){
  // console.log(`entered check`)
  console.log(val);
  if(val === 'ACE'){
    return 11;
  } else if(val === 'JACK' || val === 'QUEEN' || val === 'KING'){
    return 10;
  } else {
    return Number(val)
  }
}

function startGame(){
  isAlive = true;
  player.chips -= 5;
  playerEl.textContent = `${player.name}: $${player.chips}`
  if(document.getElementsByClassName('card-img').length > 0){
    document.getElementById('cards-container').innerHTML = ''
  }
  
  cards = [];

  if(!isLoading){
    isLoading = true;
    fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
      .then(res=>res.json())
      .then(data=>{
        cards = data;
        sum = checkForValue(data.cards[0].value) + checkForValue(data.cards[1].value);
        renderImages(data.cards)
        isLoading = false;
        renderGame();
        return data;
      })
  }
}

function renderImages(cardArr){
  cardArr.map((item)=>{
    // console.log(item)
    let cardImg = document.createElement('img')
    cardImg.setAttribute('id', item.code)
    cardImg.classList.add('card-img')
    cardImg.src = item.image
    document.getElementById('cards-container').appendChild(cardImg);
  })
}

function renderGame(){
  sumEl.textContent = "Sum :" + sum
  if (sum <= 20) {
      message = "Do you want to draw a new card?"
  } else if (sum === 21) {
      message = "You've got Blackjack!"
      hasBlackJack = true
      player.chips += 10;
      playerEl.textContent = `${player.name}: $${player.chips}`
  } else {
      message = "You're out of the game!"
      isAlive = false
  }
  messageEl.textContent = message; 
 
}

function newCard(){
  // console.log('Drawing a new card from the deck!')
  if(isAlive && !hasBlackJack && !isLoading){
    isLoading = true;
    fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
      .then(res=>res.json())
      .then(data=>{
        // console.log(data)
        cards.cards.push(data.cards[0])
        cards.remaining = data.remaining;
        sum += checkForValue(data.cards[0].value)
        renderImages(data.cards)
        isLoading = false;
        renderGame()
        return data;
      })
  }
  
}



document.getElementById('start').addEventListener('click', startGame);
document.getElementById('newCard').addEventListener('click', newCard);
// console.log(`${firstCard}, ${secondCard}`)
// console.log(hasBlackJack)