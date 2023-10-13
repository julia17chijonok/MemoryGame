const cards = document.querySelectorAll('.memory-card'),
      winMassge = document.querySelector('.win-massage__bg'),
      result = document.querySelector('.win-massage__result'),
      btnPlayAgain = document.querySelector('.win-massage__btn');

let hasFlippedCard = false;
let firstCard, secondCard;
let attempt = 0;
let matches = 0;

function flipCard() {
  this.classList.toggle('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
  }
}

function checkForMatch() {
    attempt++;
    console.log(attempt);
    if(firstCard.dataset.icon === secondCard.dataset.icon) {
        disableCards();
        matches++;
        if (matches == 10){
            console.log(attempt);
            console.log('You won!');
            showWinMessage();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    }, 700);
}

function showWinMessage() {
    result.textContent = `${attempt}`;
    winMassge.classList.add('show');
}

function shuffleCards(){
    cards.forEach(card => {
        let randomCard = Math.floor(Math.random() * 12);
        card.style.order = randomCard;
      });  
}

shuffleCards();

cards.forEach(card => card.addEventListener('click', flipCard));

btnPlayAgain.addEventListener('click', () => {
    winMassge.classList.remove('show');
    cards.forEach(card => card.classList.remove('flip'));
    shuffleCards();
    matches = 0;
    attempt = 0;
    hasFlippedCard = false;
    cards.forEach(card => card.addEventListener('click', flipCard));
});