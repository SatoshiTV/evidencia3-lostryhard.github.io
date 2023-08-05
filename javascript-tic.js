let currentPlayer = 'X';
let gameStarted = false;
let gameFinished = false;
let rounds = 5;
let playerXWins = 0;
let playerOWins = 0;

function makeMove(cuadro) {
  if (!gameStarted || gameFinished || cuadro.textContent !== '') return;
  cuadro.textContent = currentPlayer;
  checkWin();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const cuadros = document.querySelectorAll('.cuadro');
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]            // Diagonal
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (
      cuadros[a].textContent !== '' &&
      cuadros[a].textContent === cuadros[b].textContent &&
      cuadros[a].textContent === cuadros[c].textContent
    ) {
      rounds++;
      gameFinished = true;
      cuadros[a].style.backgroundColor = 'green';
      cuadros[b].style.backgroundColor = 'green';
      cuadros[c].style.backgroundColor = 'green';
      currentRoundWinner = cuadros[a].textContent;

      if (currentRoundWinner === 'X') {
        playerXWins++;
      } else {
        playerOWins++;
      }

      updateButtons();
      updateScores();
      return;
    }
  }

  const isTie = [...cuadros].every(cuadro => cuadro.textContent !== '');
  if (isTie) {
    rounds++;
    gameFinished = true;
    cuadros.forEach(cuadro => cuadro.style.backgroundColor = 'red');
    currentRoundWinner = '';
    updateButtons();
    updateScores();
  }
}

function setPlayer(player) {
  if (!gameStarted && !gameFinished) {
    currentPlayer = player;
    updateButtons();
  }
}

function startGame() {
  gameStarted = true;
  const cuadros = document.querySelectorAll('.cuadro');
  cuadros.forEach(cuadro => {
    cuadro.textContent = '';
    cuadro.style.backgroundColor = '';
  });
  updateButtons();
}

function nextGame() {
  gameFinished = false;
  gameStarted = true;
  const cuadros = document.querySelectorAll('.cuadro');
  cuadros.forEach(cuadro => {
    cuadro.textContent = '';
    cuadro.style.backgroundColor = '';
  });
  currentRoundWinner = '';
  updateButtons();
}

function finalGame() {
  gameFinished = true;
  gameStarted = false;
  updateButtons();

  if (playerXWins > playerOWins) {
    alert(`¡Felicidades, Jugador X, ganaste el juego con ${playerXWins} puntos!`);
  } else if (playerOWins > playerXWins) {
    alert(`¡Felicidades, Jugador O, ganaste el juego con ${playerOWins} puntos!`);
  } else {
    alert('El juego terminó en empate.');
  }

  rounds = 5;
  playerXWins = 0;
  playerOWins = 0;
  updateScores();

  const cuadros = document.querySelectorAll('.cuadro');
  cuadros.forEach(cuadro => {
    cuadro.textContent = '';
    cuadro.style.backgroundColor = '';
  });
}

function updateButtons() {
  const startBtn = document.getElementById('startBtn');
  const nextBtn = document.getElementById('nextBtn');
  const playerXBtn = document.getElementById('playerXBtn');
  const playerOBtn = document.getElementById('playerOBtn');

  startBtn.disabled = gameStarted || gameFinished;
  nextBtn.disabled = !gameFinished;
  playerXBtn.disabled = gameStarted || gameFinished;
  playerOBtn.disabled = gameStarted || gameFinished;
}
function updateScores() {
  const playerXScore = document.getElementById('playerXScore');
  const playerOScore = document.getElementById('playerOScore');

  playerXScore.textContent = `Puntos Jugador X: ${playerXWins}`;
  playerOScore.textContent = `Puntos Jugador O: ${playerOWins}`;
}
