document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pacmanCanvas');
    const context = canvas.getContext('2d');
  
    // Set the canvas background color to black
    canvas.style.backgroundColor = 'black';
  
    // Define Pac-Man object
    const pacman = {
      x: 30,
      y: 30,
      radius: 15,
      mouthOpen: false,
      direction: 'right',
      speed: 2
    };
  
    // Draw Pac-Man on the canvas
    function drawPacman() {
      context.beginPath();
      context.arc(pacman.x, pacman.y, pacman.radius, 0.25 * Math.PI, 1.75 * Math.PI, pacman.mouthOpen);
      context.lineTo(pacman.x, pacman.y);
      context.fillStyle = 'yellow';
      context.fill();
      context.closePath();
    }
  
    // Update Pac-Man's position and mouth state
    function updatePacman() {
      if (pacman.mouthOpen) {
        pacman.mouthOpen = false;
      } else {
        pacman.mouthOpen = true;
      }
  
      if (pacman.direction === 'right') {
        pacman.x += pacman.speed;
      } else if (pacman.direction === 'left') {
        pacman.x -= pacman.speed;
      } else if (pacman.direction === 'up') {
        pacman.y -= pacman.speed;
      } else if (pacman.direction === 'down') {
        pacman.y += pacman.speed;
      }
    }
  
    // Clear the canvas and redraw Pac-Man
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    // Game loop
    function updateGame() {
      clearCanvas();
      drawPacman();
      updatePacman();
  
      requestAnimationFrame(updateGame);
    }
  
    // Control Pac-Man's movement using arrow keys
    document.addEventListener('keydown', (event) => {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
  
      if (event.keyCode === LEFT_KEY) {
        pacman.direction = 'left';
      } else if (event.keyCode === RIGHT_KEY) {
        pacman.direction = 'right';
      } else if (event.keyCode === UP_KEY) {
        pacman.direction = 'up';
      } else if (event.keyCode === DOWN_KEY) {
        pacman.direction = 'down';
      }
    });
  
    // Start the game
    updateGame();
  });
  