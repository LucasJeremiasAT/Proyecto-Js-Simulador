console.log ("One Must Fall")

const MIN_POWER = 10;
const MAX_POWER = 30;
//--- Selección de Personajes ---
const personajes = [
    "Guerrero",
    "Mago",
    "Pícaro",
    "Caballero",
    "Brujo",
    "Ninja",
    "Monje",
    "Sacerdote"
];

console.log("Selección de personajes:");

let roster = 1;
for(const nombre of personajes){
    console.log(roster + ". " + nombre);
    roster++;
}

let eleccion = parseInt(prompt("Elegí el número de tu personaje: ")) -1;

const jugador = personajes[eleccion];

const personajesCpu = personajes.slice();
personajesCpu.splice(eleccion, 1);
const cpu = personajesCpu[Math.floor(Math.random() * personajesCpu.length)];



console.log(personajes);
console.log(personajesCpu);
console.log("Tu personaje es: " + jugador);
console.log("CPU es: " + cpu);

let vidaJugador = 100;
let vidaCpu = 100;

let round = 0;

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
    ]
}

function ataque(personaje){
    const ataques = habilidades[personaje];
    return ataques[Math.floor(Math.random() * ataques.length)]
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

while(siguenPeleando()) {
    round++;

    let ataqueJugador = ataque(jugador);
    let ataqueCpu = ataque(cpu);
    console.log(ataqueJugador);
    console.log(ataqueCpu);

    if(ataqueJugador.poder === ataqueCpu.poder) {
        console.log("ambos tienen la misma fuerza");
    }
    else if(ataqueJugador.poder > ataqueCpu.poder) {
        console.log("el " + jugador + " tiene un ataque mas fuerte que el " + cpu);
        vidaCpu = vidaCpu - ataqueJugador.poder;
    }else{
        console.log("el " + cpu + " tiene un ataque mas fuerte que el " + jugador);
        vidaJugador = vidaJugador - ataqueCpu.poder;
    }
    console.log("HP " + jugador + ": " + vidaJugador);
    console.log("HP " + cpu + ": " + vidaCpu);
    console.log("Round " + round);
}

if (JugadorSigueVivo()){
    console.log(jugador + " gana la pelea")
}else {
    console.log(cpu + " gana la pelea");
}
