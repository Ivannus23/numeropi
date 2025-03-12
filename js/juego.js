document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let snake = [{ x: 150, y: 150 }];
    let direction = "right";
    let food = { x: 100, y: 100 };
    let score = 0;
    let sonidoActivado = true;
    let sonidoComer = new Audio("https://www.myinstants.com/media/sounds/pop-cat.mp3");
    let gameRunning = false;

    function actualizarScore() {
        document.getElementById("score").innerText = "Puntaje: " + score;
    }

    function draw() {
        ctx.fillStyle = "#004080";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "16px Orbitron";
        ctx.fillText("π", food.x + 3, food.y + 15);

        ctx.fillStyle = "lime";
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
    }

    function update() {
        let head = { ...snake[0] };

        if (direction === "up") head.y -= 10;
        if (direction === "down") head.y += 10;
        if (direction === "left") head.x -= 10;
        if (direction === "right") head.x += 10;

        // Colisiones
        if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || colisiona(head)) {
            alert("Perdiste. Puntaje final: " + score);
            resetGame();
            return;
        }

        if (head.x === food.x && head.y === food.y) {
            score++;
            actualizarScore();
            if (sonidoActivado) sonidoComer.play();
            food = {
                x: Math.floor(Math.random() * 30) * 10,
                y: Math.floor(Math.random() * 30) * 10
            };
        } else {
            snake.pop();
        }

        snake.unshift(head);
    }

    function colisiona(pos) {
        return snake.some((segment, index) => index !== 0 && segment.x === pos.x && segment.y === pos.y);
    }

    function gameLoop() {
        if (!gameRunning) return;
        update();
        draw();
        setTimeout(gameLoop, 100);
    }

    function resetGame() {
        snake = [{ x: 150, y: 150 }];
        direction = "right";
        score = 0;
        actualizarScore();
        food = { x: 100, y: 100 };
    }

    document.getElementById("iniciar-btn").addEventListener("click", () => {
        document.getElementById("pantalla-inicio").style.display = "none";
        canvas.style.display = "block";
        document.getElementById("score").style.display = "block";
        document.getElementById("sonido-btn").style.display = "inline-block";
        gameRunning = true;
        resetGame();
        gameLoop();
    });

    document.getElementById("sonido-btn").addEventListener("click", () => {
        sonidoActivado = !sonidoActivado;
        document.getElementById("sonido-btn").innerText = sonidoActivado ? "🔊 Sonido: Activado" : "🔇 Sonido: Desactivado";
    });

    // Swipe Móvil
    let touchX = 0, touchY = 0;
    canvas.addEventListener("touchstart", e => {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
    });

    canvas.addEventListener("touchmove", e => {
        let dx = e.touches[0].clientX - touchX;
        let dy = e.touches[0].clientY - touchY;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && direction !== "left") direction = "right";
            else if (dx < 0 && direction !== "right") direction = "left";
        } else {
            if (dy > 0 && direction !== "up") direction = "down";
            else if (dy < 0 && direction !== "down") direction = "up";
        }

        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
    });
});
