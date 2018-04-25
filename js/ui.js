// SCRIPTS FOR USER INTERFACE
/* global $ player allEnemies Enemy allHearts Heart*/
//immediately loads all characters to opening screen
(function loadHeroes() {
  const heroes = {
    'Jim': 'images/char-boy.png',
    'Laura': 'images/char-cat-girl.png',
    'Sonya': 'images/char-horn-girl.png',
    'Brigitte': 'images/char-pink-girl.png',
    'Kerrigan': 'images/char-princess-girl.png'
  };

  const cardsContainer = $('.ui.cards');

  Object.entries(heroes).forEach(([name, url], i) => {
    const card = $(`
        <a class="ui card ${i === 0 ? 'selected' : ''}">
          <div class="centered ui tiny image">
            <img src="${url}">
          </div>
          <div class="content">
            <div class="header">${name}</div>
          </div>
        </a>`);

    card.data('url', url);

    cardsContainer.append(card);
  });

  $('#hero-selection').append(cardsContainer);
}());

function startGame() {
  player.started = true;
  //create 5 enemies
  for (let i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
  }
}

function restartGame() {
  showStartingModal();

  player.score = 0;

  player.lives = 3;
  allHearts = [new Heart(3), new Heart(2), new Heart(1)];
}

function showStartingModal() {
  $('.ui.basic.modal').modal({
    closable: false
  }).modal('show');
}

function showLoseModal() {
  $('#lose').modal({
    closable: false
  }).modal('show');
}

function showWinModal() {
  $('#win').modal('show');
}


//set event listeners
$('.cards').on('click', '.card', function() {
  const that = $(this);
  $('.card').removeClass('selected');
  that.addClass('selected');

  player.sprite = that.data('url');
});

$('#start').on('click', startGame);

$('#restart-win, #restart-lose').on('click', restartGame);

//welcome new player
showStartingModal();