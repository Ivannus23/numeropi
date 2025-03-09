// Mostrar/Ocultar menú en móviles
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Ocultar nav bar al hacer scroll hacia abajo y mostrar al subir
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');

    if (currentScroll > lastScrollTop) {
        navbar.style.top = "-60px"; // Oculta la navbar
    } else {
        navbar.style.top = "0"; // Muestra la navbar
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Juego de la serpiente
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

let snake = [{ x: 150, y: 150 }];
let direction = "right";
let food = { x: 100, y: 100 };

function draw() {
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar serpiente
    ctx.fillStyle = "blue";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));

    // Dibujar comida (π)
    ctx.fillStyle = "red";
    ctx.fillText("π", food.x, food.y);
}

function update() {
    let head = { ...snake[0] };

    if (direction === "up") head.y -= 10;
    if (direction === "down") head.y += 10;
    if (direction === "left") head.x -= 10;
    if (direction === "right") head.x += 10;

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * 29) * 10, y: Math.floor(Math.random() * 29) * 10 };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function changeDirection(newDirection) {
    direction = newDirection;
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();
