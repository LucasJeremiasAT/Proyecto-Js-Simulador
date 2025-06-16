console.log ("One Must Fall")

const MIN_POWER = 10;
const MAX_POWER = 30;

let hpGuerrero = 100;
let hpMago = 100;

let round = 0;

function calcularAtaque() {
    return parseInt(Math.random() * (MAX_POWER - MIN_POWER) + MIN_POWER);
}

function siguenPeleando() {
    return hpGuerrero > 0 && hpMago > 0;
}

function GuerreroSigueVivo() {
    return hpGuerrero > hpMago;
}

function CalcularRound() {
    return round = round + 1;
}

while(siguenPeleando()) {
    CalcularRound();
    let ataqueGuerrero = calcularAtaque();
    let ataqueMago = calcularAtaque();
    console.log(ataqueGuerrero);
    console.log(ataqueMago);

    if(ataqueGuerrero === ataqueMago) {
        console.log("ambos tienen la misma fuerza");
    }
    else if(ataqueGuerrero > ataqueMago) {
        console.log("el Guerrero tiene un ataque mas fuerte que el Mago")
        hpMago = hpMago - ataqueGuerrero;
    }else{
        console.log("el Mago tiene un ataque mas fuerte que el Guerrero");
        hpGuerrero = hpGuerrero - ataqueMago;
    }
    console.log("HP Guerrero: " + hpGuerrero);
    console.log("HP Mago: " + hpMago);
    console.log("Round " + round);
}

if (GuerreroSigueVivo()){
    console.log("Guerrero gana la pelea")
}else {
    console.log("Mago gana la pelea");
}
