/*
Instructiunile de creare a joculetului razlet

1. Generarea unui numar aleatoriu
2. registrarea numarului al incercarii la care jucatorul este,
incepand de la 1
3. Da-i juctaorului un hint
4. Cand numarul este submis, sa se inregistreze undeva si jucatorul
sa vada incercarile
5. Vezi daca nr e corect
6. Daca este corect
    -arata un mesaj fericit
    -nu lasa pe jucator sa mai incerce
    -arata un buton ca sa reia jocul
7. Daca este incorect
    -spune-i ca a gresit
    -lasa-l sa incerce din nou
    -Creste numaru de incercari
    -continua
8. Daca jucatorul esueaza ca nu mai are incercari fraieru,
spune-i ca e fraier si ca jocu a luat sfarsit si fa-l sa nu mai
poa sa scrie si sa afisezi un buton sa reia jocu

9. Cand jocu se reia, fii sigur ca logica jocului si interfata
userului este complet ca noua
*/

let numar=Math.floor(Math.random()*100)+1;
console.log(numar);
//guardar referencia a cada parrafo de informacion

const guesses=document.querySelector(".guesses");
const lastResult=document.querySelector(".lastResult");
const lowOrHi=document.querySelector(".lowOrHi");

//Guardar referencia al input y al buton enviar

const guessSubmit=document.querySelector(".guessSubmit");
const guessField=document.querySelector(".guessField");

//variables para los intentos
//La segunda variable guarda la referencia la boton reset

let guessCount=1;
let resetButton;
guessField.focus();

//Function para comprobar el numero adivinar
function checkGuess(){
    //Guardamos el valor infresado en el input y nos aseguramos
    //que es un numero, con Number();

    let userGuess=Number(guessField.value);

    //Comprobamos si estamos en el primer intento
    if(guessCount===1){
        guesses.textContent="Incercarile anterioare ";
    }
    guesses.textContent+=userGuess+" ";

    //En este bloque comprobaremos los pasos del 5 al 8
    if(userGuess===numar){
        lastResult.textContent="Bravo";
        lastResult.style.backgroundColor="green";
        lowOrHi.textContent="";
        setGameOver();
    }else if(guessCount===10){
        lastResult.textContent="Ai";
        setGameOver();
    }else{
        lastResult.textContent="Incorect";
        lastResult.style.backgroundColor="red";
        if(userGuess<numar){
            lowOrHi.textContent="Numaru generat e mai mare";
        }else{
            lowOrHi.textContent="Numaru generat e mai mic";
        }
    }

    //Preparamos la variables para el siguiente intento
    //Vaciamos el valor del campo numero
    //Aplicamos el foco al input
    guessCount++;
    guessField.value="";
    guessField.focus();
}

//agregamos un listener al boton submit guessSubmit
guessSubmit.addEventListener("click", checkGuess);

function setGameOver(){
    guessField.disabled=true;
    guessSubmit.disabled=true;
    resetButton=document.createElement("button");
    resetButton.textContent="Reincepe jocul";
    document.body.append(resetButton);

    //creamos un listener al buton creado
    resetButton.addEventListener("click", resetGame);
}

//creamos la funcion reset game

function resetGame(){
    guessCount=1;
    const resetParas = document.querySelectorAll(".resultParas p");
    for(let i=0; i<resetParas.length; i++){
        resetParas[i].textContent="";
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled=false;
    guessSubmit.disabled=false;
    guessField.value="";
    guessField.focus();
    lastResult.style.backgroundColor="white";
    numar=Math.floor(Math.random()*100)+1;
}
