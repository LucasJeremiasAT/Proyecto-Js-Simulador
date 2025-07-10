//--- Selección de Personajes ---
const personajes = [
    "Guerrero",
    "Mago",
    "Pícaro",
    "Caballero",
    "Brujo",
    "Ninja",
    "Monje",
    "Sacerdote",
    "Cazador",
    "Bárbaro"
];


//--- Definición de habilidades para cada personaje ---
const habilidades = {
    Guerrero: [
        { nombre: "Golpe Pesado", poder: 15 },
        { nombre: "Guillotina", poder: 20 },
        { nombre: "Furia de Acero", poder: 30 }
    ],
    Mago: [
        { nombre: "Bola de Fuego", poder: 15 },
        { nombre: "Lanza de Hielo", poder: 20 },
        { nombre: "Lluvia de Meteoritos", poder: 30 }
    ],
    Pícaro: [
        { nombre: "Puñalada Rápida", poder: 15 },
        { nombre: "Corte Preciso", poder: 20 },
        { nombre: "Ataque Letal", poder: 30 }
    ],
    Caballero: [
        { nombre: "Espadazo Recto", poder: 15 },
        { nombre: "Golpe con Escudo", poder: 20 },
        { nombre: "Carga Imparable", poder: 30 }
    ],
    Brujo: [
        { nombre: "Misil Sombrío", poder: 15 },
        { nombre: "Llamas Malditas", poder: 20 },
        { nombre: "Ruptura Infernal", poder: 30 }
    ],
    Ninja: [
        { nombre: "Ataque con Shuriken", poder: 15 },
        { nombre: "Corte Sigiloso", poder: 20 },
        { nombre: "Golpe Sombrío", poder:30 }
    ],
    Monje: [
        { nombre: "Golpe de Palma", poder: 15 },
        { nombre: "Puño Ascendente", poder: 20 },
        { nombre: "Ira Interior", poder:30 }
    ],
    Sacerdote: [
        { nombre: "Luz Castigadora", poder: 15 },
        { nombre: "Rayo Sagrado", poder: 20 },
        { nombre: "Juicio Divino", poder:30 }
    ],
    Cazador: [
        { nombre: "Disparo Preciso", poder: 15 },
        { nombre: "Trampa Explosiva", poder: 20 },
        { nombre: "Flecha Letal", poder: 30 }
    ],
    Bárbaro: [
        { nombre: "Golpe Salvaje", poder: 15 },
        { nombre: "Grito de Guerra", poder: 20 },
        { nombre: "Tormenta de Hachas", poder: 30 }
    ]
}

// --- Selección de Personajes ---
function seleccionarPersonaje(jugador) {
    const personajesCpu = personajes.filter(p => p !== jugador);
    const cpu = personajesCpu[Math.floor(Math.random() * personajesCpu.length)];

let vidaJugador = 100;
let vidaCpu = 100;

let round = 0;

//--- Funciones de combate ---

function ataque(personaje){
    const ataques = habilidades[personaje];
    return ataques[Math.floor(Math.random() * ataques.length)];
}

function siguenPeleando() {
    return vidaJugador > 0 && vidaCpu > 0;
}

function JugadorSigueVivo() {
    return vidaJugador > vidaCpu;
}

function CalcularRound() {
    return round = round + 1;
}

// --- Estructura del combate ---

let pelea = document.getElementById("pelea");

pelea.innerHTML = `<h2>${jugador} vs ${cpu}</h2>`;

let PeleaEnTiempoReal = "";

while(siguenPeleando()) {
    CalcularRound()

    let ataqueJugador = ataque(jugador);
    let ataqueCpu = ataque(cpu);
    let mensaje = `<p><strong>Round ${round}</strong></p>`;

    // --- Muestra los ataques usados por ambos personajes ---

    mensaje += `<p>El ${jugador} usa <strong>${ataqueJugador.nombre}</strong> (${ataqueJugador.poder} de poder)</p>`;
    mensaje += `<p>El ${cpu} usa <strong>${ataqueCpu.nombre}</strong> (${ataqueCpu.poder} de poder)</p>`;

    if(ataqueJugador.poder === ataqueCpu.poder) {
        mensaje += `<p>Empate, no se hacen daño.</p>`;
    }
    else if(ataqueJugador.poder > ataqueCpu.poder) {
        mensaje += `<p>El ${jugador} gana el intercambio de poderes y le hace ${ataqueJugador.poder} puntos de daño.</p>`;
        vidaCpu = vidaCpu - ataqueJugador.poder;
    }else{
        mensaje += `<p>El ${cpu} gana el intercambio de poderes y le hace ${ataqueCpu.poder} puntos de daño.</p>`;
        vidaJugador = vidaJugador - ataqueCpu.poder;
    }
    
    // --- Muestra la vida de los jugadores ---

    mensaje += `<p>HP ${jugador}: ${Math.max(vidaJugador, 0)}</p>`;
    mensaje += `<p>HP ${cpu}: ${Math.max(vidaCpu, 0)}</p>`;
    mensaje += `<hr>`;

    PeleaEnTiempoReal += mensaje;
}

// --- Pelea completa después del bucle ---
pelea.innerHTML += PeleaEnTiempoReal;

// --- Muestra resultado final ---
if (JugadorSigueVivo()){
    pelea.innerHTML += `<h3>El ${jugador} gana la pelea</h3>`;
} else {
    pelea.innerHTML += `<h3>El ${cpu} gana la pelea</h3>`;
}

// --- Guardar el ganador de la pelea en el localStorage ---

const resultado = {
    jugador,
    cpu,
    ganador: JugadorSigueVivo() ? jugador : cpu,
    fecha: new Date().toLocaleString()
};

let historial = JSON.parse(localStorage.getItem("historial")) || [];
historial.push(resultado);
localStorage.setItem("historial", JSON.stringify(historial));

}

// --- Mostrar el Historial ---

mostrarHistorial();

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


//--- Eventos para los botones ---

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
