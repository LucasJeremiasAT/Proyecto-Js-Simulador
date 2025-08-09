// --- Variables globales ---
let personajes = [];
let habilidades = {};

let jugadorSel; //jugador seleccionado
let cpuSel; //cpu selecciolado

let vidaJugador;
let vidaCpu;
let round;

const pelea = document.getElementById("pelea");

// --- Carga los datos del JSON ---
fetch("datos.json")
    .then(res => res.json())
    .then(data => {
        personajes = data.personajes;
        habilidades = data.habilidades;
    });

// --- Función que elige un ataque aleatorio de un personaje ---
function ataqueAleatorio(personaje, habilidades) {
    const ataques = habilidades[personaje];
    return ataques[Math.floor(Math.random() * ataques.length)];
}

// --- Función que determina si ambos personajes siguen vivos ---
function siguenVivos(vidaJugador, vidaCpu) {
    return vidaJugador > 0 && vidaCpu > 0;
}

// --- Función que determina el ganador ---
function determinarGanador(vidaJugador, vidaCpu, jugador, cpu) {
    if (vidaJugador > vidaCpu) return jugador;
    else return cpu;
}

// --- Función que actualiza el DOM con el resultado final ---
function mostrarResultadoFinal(peleaContainer, ganador, jugador, cpu) {
    peleaContainer.innerHTML += `<h3>${ganador} gana la pelea</h3>`;
}

// --- Función que muestra el resumen de cada round en pantalla ---
function mostrarRound(peleaContainer, round, jugador, ataqueJugador, cpu, ataqueCpu, vidaJugador, vidaCpu) {
    let mensaje = `
        <div class="round">
            <p class="round-num"><strong>Round ${round}</strong></p>
            <p class="ataque-jugador">${jugador} usa <strong>${ataqueJugador.nombre}</strong> <span class="poder">(${ataqueJugador.poder} de poder)</span></p>
            <p class="ataque-cpu">${cpu} usa <strong>${ataqueCpu.nombre}</strong> <span class="poder">(${ataqueCpu.poder} de poder)</span></p>
    `;

    if (ataqueJugador.poder === ataqueCpu.poder) {
        mensaje += `<p class="empate">Empate, no se hacen daño.</p>`;
    } else if (ataqueJugador.poder > ataqueCpu.poder) {
        mensaje += `<p class="golpe-jugador">${jugador} gana el intercambio de poderes y le hace <span class="dano">${ataqueJugador.poder}</span> puntos de daño.</p>`;
    } else {
        mensaje += `<p class="golpe-cpu">${cpu} gana el intercambio de poderes y le hace <span class="dano">${ataqueCpu.poder}</span> puntos de daño.</p>`;
    }

    mensaje +=  `
            <p class="hp-jugador">HP ${jugador}: <span class="hp">${Math.max(vidaJugador, 0)}</span></p>
            <p class="hp-cpu">HP ${cpu}: <span class="hp">${Math.max(vidaCpu, 0)}</span></p>
            <hr>
        </div>
    `;

    peleaContainer.innerHTML += mensaje;
}

// --- Función que muestra el daño de un round y actualiza la vida ---
function simularRound(vidaJugador, vidaCpu, ataqueJugador, ataqueCpu) {
    if (ataqueJugador.poder === ataqueCpu.poder) {
        // Empate, no se hacen daño
    } else if (ataqueJugador.poder > ataqueCpu.poder) {
        vidaCpu -= ataqueJugador.poder;
    } else {
        vidaJugador -= ataqueCpu.poder;
    }
    return { vidaJugador, vidaCpu };
}

// --- Función para guardar el resultado en el historial de localStorage ---
function guardarHistorial(jugador, cpu, ganador) {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push({
        jugador,
        cpu,
        ganador,
        fecha: new Date().toLocaleString()
    });
    localStorage.setItem("historial", JSON.stringify(historial));
}

// --- Script para mostrar imagen del personaje del jugador seleccionado ---
const imgRoster = document.querySelectorAll(".img-pj");
const imgPjElegido = document.getElementById("img-pj-elegido");

imgRoster.forEach(img => {
    img.addEventListener("click", () => {
        let rutaImgRoster = img.src;
        let rutaImgPjElegido = rutaImgRoster.replace("-min", "-sel");
        imgPjElegido.src = rutaImgPjElegido;
    });
});

// --- Función para seleccionar personaje ---
function seleccionarPersonaje(jugador) {
    jugadorSel = jugador;

    const personajesCpu = personajes.filter(p => p !== jugador);
    cpuSel = personajesCpu[Math.floor(Math.random() * personajesCpu.length)];

    // Mostrar imagen jugador a la derecha del roster
    let rutaImgJugador = `./media/${jugadorSel.toLowerCase()}-sel.png`;
    document.querySelector(".pj-jugador").innerHTML = `<img src="${rutaImgJugador}" alt="${jugadorSel}">`;

    // Mostrar imagen cpu a la izquierda del roster
    let rutaImgCpu = `./media/${cpuSel.toLowerCase()}-sel.png`;
    document.querySelector(".pj-cpu").innerHTML = `<img src="${rutaImgCpu}" alt="${cpuSel}">`;

    // Inicializa vida y ronda
    vidaJugador = 100;
    vidaCpu = 100;
    round = 0;

    // Muestra el título de la pelea
    pelea.innerHTML = `<h2>${jugadorSel} vs ${cpuSel}</h2>`;
}

// --- Función que ejecuta cada round ---
function ejecutarRound() {
    if (!siguenVivos(vidaJugador, vidaCpu)) {
        const ganador = determinarGanador(vidaJugador, vidaCpu, jugadorSel, cpuSel);
        mostrarResultadoFinal(pelea, ganador, jugadorSel, cpuSel);
        guardarHistorial(jugadorSel, cpuSel, ganador);

        Swal.fire({
            title: `${ganador} ha ganado el combate`,
            text: "¡Victoria aplastante!",
            imageUrl: `./media/${ganador.toLowerCase()}.png`,
            imageWidth: 300,
            imageAlt: `Imagen de ${ganador}`
        });

        return;
    }

    round++;

    const ataqueJugador = ataqueAleatorio(jugadorSel, habilidades);
    const ataqueCpu = ataqueAleatorio(cpuSel, habilidades);

    ({ vidaJugador, vidaCpu } = simularRound(vidaJugador, vidaCpu, ataqueJugador, ataqueCpu));

    mostrarRound(pelea, round, jugadorSel, ataqueJugador, cpuSel, ataqueCpu, vidaJugador, vidaCpu);

    setTimeout(ejecutarRound, 1000);
}

// --- Evento para iniciar combate con botón ---
document.getElementById("btn-combate").addEventListener("click", () => {
    if (jugadorSel && cpuSel) {
        ejecutarRound();
    }
});

// --- Función para mostrar historial ---
function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const contenedorHistorial = document.getElementById("historial");
    contenedorHistorial.innerHTML = "<h3>Historial de Peleas</h3>";

    historial.forEach(pelea => {
        contenedorHistorial.innerHTML += `
        <p>${pelea.jugador} vs ${pelea.cpu} - Ganó: <strong>${pelea.ganador}</strong> <br>
        <small>${pelea.fecha}</small></p>
        `;
    });
}

// --- Mostrar historial al cargar la página ---
mostrarHistorial();

// --- Eventos para botones de personajes ---
document.getElementById("btn-guerrero").addEventListener("click", () => seleccionarPersonaje("Guerrero"));
document.getElementById("btn-mago").addEventListener("click", () => seleccionarPersonaje("Mago"));
document.getElementById("btn-picaro").addEventListener("click", () => seleccionarPersonaje("Pícaro"));
document.getElementById("btn-caballero").addEventListener("click", () => seleccionarPersonaje("Caballero"));
document.getElementById("btn-brujo").addEventListener("click", () => seleccionarPersonaje("Brujo"));
document.getElementById("btn-ninja").addEventListener("click", () => seleccionarPersonaje("Ninja"));
document.getElementById("btn-monje").addEventListener("click", () => seleccionarPersonaje("Monje"));
document.getElementById("btn-sacerdote").addEventListener("click", () => seleccionarPersonaje("Sacerdote"));
document.getElementById("btn-cazador").addEventListener("click", () => seleccionarPersonaje("Cazador"));
document.getElementById("btn-barbaro").addEventListener("click", () => seleccionarPersonaje("Bárbaro"));
document.getElementById("btn-amazonas").addEventListener("click", () => seleccionarPersonaje("Amazonas"));
document.getElementById("btn-bardo").addEventListener("click", () => seleccionarPersonaje("Bardo"));
document.getElementById("btn-druida").addEventListener("click", () => seleccionarPersonaje("Druida"));
document.getElementById("btn-nigromante").addEventListener("click", () => seleccionarPersonaje("Nigromante"));
document.getElementById("btn-paladin").addEventListener("click", () => seleccionarPersonaje("Paladín"));
document.getElementById("btn-valquiria").addEventListener("click", () => seleccionarPersonaje("Valquiria"));

// --- Botón para reiniciar la página ---
document.getElementById("btn-reiniciar").addEventListener("click", () => {
    location.reload();
});

// --- Botón para borrar historial ---
document.getElementById("btn-borrar").addEventListener("click", () => {
    localStorage.removeItem("historial");
    mostrarHistorial();
});
