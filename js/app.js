/* global ctx Resources $ showLoseModal showWinModal showStartingModal */
//few constants to make calculations more maintanable
const ROWS = 6;
const COLS = 5;
const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;

//represents main game object
class GameEntity {
  constructor() {
    this.x = 0;
    this.y = this.randomizePositionY();
  }

  randomizePositionY() {
    const allowedRows = [1, 2, 3];
    return allowedRows[Math.floor(Math.random() * allowedRows.length)] * CELL_HEIGHT;
  }

  // Draw the object on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//class representing hearts, which are player lives
class Heart extends GameEntity {
  constructor(id) {
    super();
    this.sprite = 'images/Heart.png';
    this.y = 5;
    this.x = CELL_WIDTH * (COLS - 1) + id * 25;
  }
}

// Enemies our player must avoid
class Enemy extends GameEntity {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor() {
    super();
    this.sprite = 'images/enemy-bug.png';
    this.multiplier = Math.random() * 4 + 1.5;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += 100 * this.multiplier * dt;
    if (this.x > CELL_WIDTH * (COLS)) {
      this.x = -CELL_WIDTH;
      this.y = this.randomizePositionY();
    }
  }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends GameEntity {
  constructor(sprite) {
    super();
    this.setStartingPosition();
    this.sprite = `images/char-boy.png`;
    this.lives = 3;
    this.score = 0;
    this.started = false;
  }

  //Sets starting position of player
  setStartingPosition() {
    this.x = CELL_WIDTH * 2;
    this.y = CELL_HEIGHT * COLS;
  }

  update() {
    if (this.y === 0 && this.started) {
      this.score += 1;
      this.setStartingPosition();
      this.checkIfWin();
    }
  }

  //what happens to player and UI after collission
  updateAfterCollision() {
    this.setStartingPosition();
    this.decrementLives();

    if (this.lives < 1) {
      allEnemies = [];
      this.started = false;
      showLoseModal();
    }
  }

  decrementLives() {
    this.lives -= 1;
    allHearts.pop();
  }

  //checks if all conditions are fulfilled to win (currently only score)
  checkIfWin() {
    if (this.score === 10) {
      this.started = false;
      allEnemies = [];
      showWinModal();
    }
  }

  handleInput(pressedKey) {
    if (this.started) {
      switch (pressedKey) {
        case 'left':
          this.x -= this.x > 0 ? CELL_WIDTH : 0;
          break;
        case 'up':
          this.y -= this.y > 0 ? CELL_HEIGHT : 0;
          break;
        case 'right':
          this.x += this.x < CELL_WIDTH * (COLS - 1) ? CELL_WIDTH : 0;
          break;
        case 'down':
          this.y += this.y < CELL_HEIGHT * (ROWS - 1) ? CELL_HEIGHT : 0;
          break;
      }
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allHearts = [new Heart(3), new Heart(2), new Heart(1)];
let allEnemies = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
$(document).on('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});