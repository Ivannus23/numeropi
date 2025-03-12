// Mostrar/Ocultar botón de volver arriba
const btnArriba = document.createElement('button');
btnArriba.id = 'btn-arriba';
btnArriba.innerHTML = '↑';
document.body.appendChild(btnArriba);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        btnArriba.style.display = 'block';
    } else {
        btnArriba.style.display = 'none';
    }
});

btnArriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound();
});

// Efecto de sonido al hacer clic en botones
const clickSound = new Audio('https://www.myinstants.com/media/sounds/pop-cat.mp3');

function playSound() {
    clickSound.play();
}

// Agregar sonido a todos los botones
const botones = document.querySelectorAll('button, .btn, .sidebar a');
botones.forEach(btn => {
    btn.addEventListener('click', () => {
        playSound();
    });
});

// ==== ⚙️ LÓGICA PARA CALCULADORA DE CÍRCULO (sección futura) ====
function calcularAreaYPerimetro() {
    const radio = parseFloat(document.getElementById('radioInput').value);
    const area = Math.PI * Math.pow(radio, 2);
    const perimetro = 2 * Math.PI * radio;

    document.getElementById('resultadoArea').textContent = `Área: ${area.toFixed(2)} u²`;
    document.getElementById('resultadoPerimetro').textContent = `Perímetro: ${perimetro.toFixed(2)} u`;
}

// ==== ⚙️ TRIVIA SIMPLE (sección futura) ====
function verificarRespuesta(preguntaID, respuestaCorrecta) {
    const seleccionada = document.querySelector(`input[name="${preguntaID}"]:checked`);
    const feedback = document.getElementById(`feedback-${preguntaID}`);

    if (!seleccionada) {
        feedback.textContent = "Selecciona una respuesta.";
        feedback.style.color = "yellow";
    } else if (seleccionada.value === respuestaCorrecta) {
        feedback.textContent = "✅ ¡Correcto!";
        feedback.style.color = "lightgreen";
    } else {
        feedback.textContent = "❌ Incorrecto.";
        feedback.style.color = "red";
    }
}

const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');

toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        toggleSidebar.classList.remove('show');
        toggleSidebar.classList.add('hide');
    }
});

// Cerrar menú al hacer clic fuera o en cualquier enlace del menú
const navLinks = document.querySelectorAll('.sidebar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        toggleSidebar.classList.remove('hide');
        toggleSidebar.classList.add('show');
    });
});

// También cerrar si haces clic fuera del menú
document.addEventListener('click', function(e) {
    if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== toggleSidebar) {
        sidebar.classList.remove('active');
        toggleSidebar.classList.remove('hide');
        toggleSidebar.classList.add('show');
    }
});

