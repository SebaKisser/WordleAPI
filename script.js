
const BUTTON = document.getElementById("guess-button");
let GUESSES = 6;
let url = 'https://random-word-api.herokuapp.com/word?number=5&&length=5&&lang=es';


fetch(url)
.then(response => response.json())
.then(response => {
    palabra = response[0].toUpperCase()
    console.log(palabra)
})
.catch (err => {
    console.log("Ocurrio un error");
})


BUTTON.addEventListener("click", intentar);

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    alertarEspacios(intento);
    intento = intento.toUpperCase();
    return intento;
}


function intentar() {

    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    if (INTENTO.length !== 5) {
        alert("La palabra debe contener 5 caracteres");
    }

    else if (INTENTO === palabra) {

        for (let i in palabra) {

            let SPAN = document.createElement('span');
            SPAN.className = 'letter';
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
            ROW.appendChild(SPAN);
        }

        GRID.appendChild(ROW);
        confettiAnimation();
        terminar("<h1>GANASTE!</h1>");
        return;
    }

    else {
        let palabraTemporal = palabra.split('');

        for (let i in INTENTO) {

            //letter es clase de span
            let SPAN = document.createElement('span');
            SPAN.className = 'letter';

            if (INTENTO[i] === palabra[i]) {
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#79b851';
                palabraTemporal[i] = null; //Elimina la letra que ya se encontro
                ROW.appendChild(SPAN);
            }
            
            else{
                let SPAN = document.createElement('span');
                SPAN.className = 'letter';

                if(palabraTemporal.includes(INTENTO[i])){
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#f3c237';
                    palabraTemporal[palabraTemporal.indexOf(INTENTO[i])] = null;
                }

                else{
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#a4aec4';
                }

                //appendChild agrega un nodo hijo al final del contenedor que seria el nodo padre
                ROW.appendChild(SPAN);
            }
        }

        GRID.appendChild(ROW);
    }

    GUESSES--;
    if (GUESSES === 0) {
        terminar("<h1>PERDISTE!</h1>");
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}

function alertarEspacios(m) {

    m = document.getElementById("guess-input").value;

    if (m.includes(' ')) {
        alert("La palabra no debe contener espacios");
    }
    else {
        return m;
    }
}

/*Funcionalidad de recargar la pagina*/
document.getElementById('botonRecarga').addEventListener('click', function() {
    location.reload();
});

/*Function para el confetti una vez ganado el juego*/
function confettiAnimation(){
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6}
    });
}