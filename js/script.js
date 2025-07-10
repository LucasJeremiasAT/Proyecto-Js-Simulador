console.log ("One Must Fall")

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
        { nombre: "Golpe Sombrio", poder:30 }
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

function seleccionarPersonaje(jugador) {
    const personajesCpu = personajes.filter(p => p !== jugador);
    const cpu = personajesCpu[Math.floor(Math.random() * personajesCpu.length)];

let vidaJugador = 100;
let vidaCpu = 100;

let round = 0;

console.log("Tu personaje es: " + jugador);
console.log("CPU es: " + cpu);

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
while(siguenPeleando()) {
    CalcularRound()

    let ataqueJugador = ataque(jugador);
    let ataqueCpu = ataque(cpu);
    console.log(ataqueJugador);
    console.log(ataqueCpu);

    if(ataqueJugador.poder === ataqueCpu.poder) {
        console.log("Empate, no se hacen daño");
    }
    else if(ataqueJugador.poder > ataqueCpu.poder) {
        console.log("El " + jugador + " tiene un ataque mas fuerte que el " + cpu);
        vidaCpu = vidaCpu - ataqueJugador.poder;
    }else{
        console.log("El " + cpu + " tiene un ataque mas fuerte que el " + jugador);
        vidaJugador = vidaJugador - ataqueCpu.poder;
    }
    
    // --- Muestra por consola la vida de los jugadores ---
    if(vidaJugador > 0) {
        console.log("HP " + jugador + ": " + vidaJugador);
    }else {
        console.log("HP " + jugador + ": 0");
    }
    if(vidaCpu > 0){
        console.log("HP " + cpu + ": " + vidaCpu);
    }else {
        console.log("HP " + cpu + ": 0");
    }
    // --- Muestra por consola la ronda que estan peleando ---
    console.log("Round " + round);
}
// --- Muestra por consola el ganador del combate ---
if (JugadorSigueVivo()){
    console.log("El " + jugador + " gana la pelea")
}else {
    console.log("El " + cpu + " gana la pelea");
}
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
