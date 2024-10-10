// Simulate loading time and remove the loading screen after 2 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none';
        document.body.classList.remove('loading');
        document.getElementById('menu').style.display = 'block';
    }, 2000); // 2 seconds loading time
});

// Show difficulty selection after clicking AI mode
document.getElementById('ai-mode').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('ai-difficulty').style.display = 'block';
});

// Start game with selected difficulty
document.getElementById('easy').addEventListener('click', () => startGame('easy'));
document.getElementById('normal').addEventListener('click', () => startGame('normal'));
document.getElementById('hard').addEventListener('click', () => startGame('hard'));
document.getElementById('impossible').addEventListener('click', () => startGame('impossible'));

function startGame(difficulty) {
    console.log(`Starting game with ${difficulty} difficulty`);

    document.getElementById('ai-difficulty').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    // Initialize the game board logic based on difficulty level here
}

// Game Board Logic (basic example, can be expanded with AI logic later)
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (!this.innerText) {
            this.innerText = 'X'; // Player's move
            // Here you can implement AI moves for different difficulty levels
        }
    });
});
