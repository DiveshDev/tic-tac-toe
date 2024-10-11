// Variables
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('game-status');
const loadingScreen = document.getElementById('loading-screen');
const homeScreen = document.getElementById('home-screen');
const gameBoard = document.getElementById('game-board');
const difficultyScreen = document.getElementById('difficulty-screen');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

// Loading Screen Animation
setTimeout(() => {
  loadingScreen.style.display = 'none';
  homeScreen.style.display = 'block';
}, 5000); // Adjusted to 5 seconds

// Function to Show Difficulty Menu
function showDifficultyMenu() {
  homeScreen.style.display = 'none';
  difficultyScreen.style.display = 'block';
}

// Function to Start the Game
function startGame(difficulty) {
  difficultyScreen.style.display = 'none';
  gameBoard.style.display = 'block';
  initGame(difficulty);
}

// Initialize the Game
function initGame(difficulty) {
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
    cell.innerText = '';
    board = ['', '', '', '', '', '', '', '', ''];
  });
  statusText.innerText = `Player ${currentPlayer}'s Turn`;
  isGameOver = false;
}

// Handle Cell Click
function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] !== '' || isGameOver) return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWin()) {
    statusText.innerText = `Player ${currentPlayer} Wins!`;
    isGameOver = true;
  } else if (board.includes('') === false) {
    statusText.innerText = `It's a Draw!`;
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a Winner
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}
