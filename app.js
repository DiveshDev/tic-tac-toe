// Variables
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('game-status');
const loadingScreen = document.getElementById('loading-screen');
const homeScreen = document.getElementById('home-screen');
const gameBoard = document.getElementById('game-board');
const difficultyScreen = document.getElementById('difficulty-screen');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Player starts as X
let isGameOver = false;
let aiDifficulty = 'easy'; // Default difficulty

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
  aiDifficulty = difficulty; // Set AI difficulty
  difficultyScreen.style.display = 'none';
  gameBoard.style.display = 'block';
  initGame();
}

// Initialize the Game
function initGame() {
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
    
    if (currentPlayer === 'O' && !isGameOver) {
      aiMove();
    }
  }
}

// AI Move Function
function aiMove() {
  let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

  // AI Logic Based on Difficulty
  if (aiDifficulty === 'easy') {
    // Easy: Random Move
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex);
  } else if (aiDifficulty === 'normal') {
    // Normal: Check if needs to block player or make random move
    const winningMove = findWinningMove('O');
    if (winningMove !== null) {
      makeMove(winningMove);
    } else {
      const blockingMove = findWinningMove('X');
      if (blockingMove !== null) {
        makeMove(blockingMove);
      } else {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        makeMove(randomIndex);
      }
    }
  } else if (aiDifficulty === 'hard') {
    // Hard: Use Minimax algorithm or optimal strategy (simple version here)
    const bestMove = findBestMove();
    makeMove(bestMove);
  }
}

// Make Move Helper Function
function makeMove(index) {
  board[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

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

// Function to Find Winning Move
function findWinningMove(player) {
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = player; // Make the move
      if (checkWin()) {
        board[i] = ''; // Undo the move
        return i; // Return the winning move index
      }
      board[i] = ''; // Undo the move
    }
  }
  return null; // No winning move
}

// Function to Find Best Move (Simple AI)
function findBestMove() {
  // Check for winning move for AI
  let winningMove = findWinningMove('O');
  if (winningMove !== null) return winningMove;

  // Check for blocking move
  let blockingMove = findWinningMove('X');
  if (blockingMove !== null) return blockingMove;

  // If no winning or blocking move, return random move
  const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
  return availableCells[Math.floor(Math.random() * availableCells.length)];
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
