let puntuacionUsuario = 0;
let puntuacionComputadora = 0;
let rounds = 5;
let mode = 'pvp';
const halfPoints = Math.ceil(rounds / 2);

function computadoraElige() {
    const eleccion = ['piedra', 'papel', 'tijeras'];
    const randomIndex = Math.floor(Math.random() * eleccion.length);
    return eleccion[randomIndex];
}

function rondaGanador(usuario, computadora) {
    if (usuario === computadora) {
        return "Empate";
    } else if (
        (usuario === "piedra" && computadora === "tijera") ||
        (usuario === "papel" && computadora === "piedra") ||
        (usuario === "tijera" && computadora === "papel")
    ) {
        return "Ganaste";
    } else {
        return "Perdiste";
    }
}

function usuarioElige(usuario) {
    const computadora = mode === 'pvc' ? computadoraElige() : prompt("Elije 'piedra', 'papel' o 'tijera'");
    const resultElement = document.getElementById("result");
    const result = rondaGanador(usuario, computadora);

    if (result === "Ganaste") {
        puntuacionUsuario++;
    } else if (result === "Perdiste") {
        puntuacionComputadora++;
    }

    if (puntuacionUsuario >= halfPoints || puntuacionComputadora >= halfPoints) {
        let ganador = puntuacionUsuario >= halfPoints ? "¡Ganaste el juego!" : "¡El jugador-2 ganó el juego!";
        resultElement.textContent = `${result}. ${ganador} Puntuación: Jugador (${puntuacionUsuario}) - Computadora (${puntuacionComputadora})`;
        document.querySelectorAll('.game button').forEach(button => button.disabled = true);
    } else {
        resultElement.textContent = `${result}. Puntuación: Jugador (${puntuacionUsuario}) - Jugador-2 (${puntuacionComputadora})`;
    }
}

document.getElementById("rounds").addEventListener("change", function () {
    rounds = parseInt(this.value);
    halfPoints = Math.ceil(rounds / 2);
    resetGame();
});

document.getElementById("mode").addEventListener("change", function () {
    mode = this.value;
    resetGame();
});

function resetGame() {
    puntuacionUsuario = 0;
    puntuacionComputadora = 0;
    document.getElementById("result").textContent = "¡Elige tu opción!";
    document.querySelectorAll('.game button').forEach(button => button.disabled = false);
}
