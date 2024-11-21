window.onload = function () {
  document.getElementById("botonInicio").onclick = iniciarJuego;
  let puntuacionIzquierda = document.getElementById("puntuacionIzquierda");
  let puntuacionDerecha = document.getElementById("puntuacionDerecha");

  const TOPEDERECHA = 300;
  const TOPEIZQUIERDA = 0;
  const TOPEINFERIOR = 300;
  const TOPESUPERIOR = 0;

  let puntosDerecha = 0;
  let puntosIzquierda = 0;

  let posicion=0;                                         // Posición del array 0, 1, 2, 3, 4, 5, 6, 7


  let x = 0;
  let y = 0;

  let yUp, yDown;

  let valorX_posicion_inicial_pelota = 300;
  let valorY_posicion_inicial_pelota = 200;

  var dx = 2;
  var dy = -2;

  function Pelota() {
    this.x = 300;
    this.y = 200;
    this.width = 4;
    this.height = 4;
    this.radio = 10;
    this.direccionX = 1; // Dirección horizontal (1 para derecha, -1 para izquierda)
    this.direccionY = 0; // Dirección vertical (basada en el impacto)
    velocidadPelota = 1; // Velocidad variable
    dx = velocidadPelota; // Direcciones de la pelota
    dy = -velocidadPelota;
    this.animacionComecocos = [[0,0],[32,0],
    [0,65],[32,65],
    [0,95],[32,95],
    [0,32],[32,32]];
  }

  Pelota.prototype.mover = function () {
    this.x += dx;
    this.y += dy;
  };

  Pelota.prototype.pintar = function () {
    ctx.beginPath();
    ctx.arc(pelota1.x, pelota1.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  };
  function marcador() {
    if (pelota1.x == 0) {
      //diciendole que el ejex  es doble o triple igual a 0 decimos que cuando toque el borde de la izquierda

      puntosIzquierda++; //sumo los puntos

      pelota1.x = valorX_posicion_inicial_pelota; // una vez contado los puntos lo que hago es que regreso la pelota al origen.
      pelota1.y = valorY_posicion_inicial_pelota; // lo hago para las dos posiciones.

      let objetivo = document.getElementById("puntuacionIzquierda"); // cojo la etiqueta que he hecho en el html y le asigono una variable
      objetivo.innerHTML = "Puntuacion Izquierda: " + puntosIzquierda; // con esa variable de antes le digo que me escriba en el html el numero que quiero.

      //------------------------------------BORRAR-------------------------------------
      console.log(puntosIzquierda + "puntos izquierda "); // para comprobarlo en la consola
      //------------------------------------BORRAR-------------------------------------
    }
    
    if (pelota1.x == 590) {
      // si no pongo doble o triple no compara

      puntosDerecha++;

      pelota1.x = valorX_posicion_inicial_pelota; // una vez contado los puntos lo que hago es que regreso la pelota al origen.
      pelota1.y = valorY_posicion_inicial_pelota; // lo hago para las dos posiciones.

      let objetivo = document.getElementById("puntuacionDerecha"); // cojo la etiqueta que he hecho en el html y le asigono una variable
      objetivo.innerHTML = "Puntuacion Derecha: " + puntosDerecha; // con esa variable de antes le digo que me escriba en el html el numero que quiero.

      //------------------------------------BORRAR-------------------------------------
      console.log(puntosDerecha + "puntos derecha");
      //------------------------------------BORRAR-------------------------------------
    }
      
  }

  // Normalizar dirección
  function normalizarDireccion() {
    let magnitud = Math.sqrt(pelota1.direccionX ** 2 + pelota1.direccionY ** 2);
    pelota1.direccionX /= magnitud;
    pelota1.direccionY /= magnitud;
  }

  function colisionDetectada() {
    // Verificar si la pelota choca con los bordes
    if (pelota1.x + pelota1.width > canvas.width || pelota1.x < 0) {
      dx = -dx; // Invertir la dirección en el eje X
    }
    if (pelota1.y + pelota1.height > canvas.height || pelota1.y < 0) {
      dy = -dy; // Invertir la dirección en el eje Y
    }
  }

  function animarPelota() {
    pelota1.mover();
    pelota1.pintar();
    marcador();
    colisionConJugador(); 
    colisionDetectada();
  }

  function colisionConJugador() {
    let pelotaIzq = pelota1.x;
    let pelotaDer = pelota1.x + pelota1.radio + pelota1.radio;
    let pelotaArriba = pelota1.y;
    let pelotaAbajo = pelota1.y + pelota1.radio+ pelota1.radio;
  
    let personaje1Izq = personaje1.x;
    let personaje1Der = personaje1.x + personaje1.ancho;
    let personaje1Arriba = personaje1.y;
    let personaje1Abajo = personaje1.y + personaje1.alto;
  
    let personaje2Izq = personaje2.x2;
    let personaje2Der = personaje2.x2 + personaje2.ancho;
    let personaje2Arriba = personaje2.y2;
    let personaje2Abajo = personaje2.y2 + personaje2.alto;
  
console.log(pelotaIzq, "-", pelotaDer);
console.log(personaje2Izq, "#", personaje2Der);
console.log(pelotaArriba, "-", pelotaAbajo);
console.log(personaje2Arriba, "#", personaje2Abajo);

//console.log(personaje2);

    // Colisión con personaje1
    if (
      pelotaDer > personaje1Izq &&
      pelotaIzq < personaje1Der &&
      pelotaArriba > personaje1Abajo &&
      pelotaAbajo < personaje1Arriba
    ) {

      console.log("colision con 1")
      pelota1.direccionX = 1;
      let impacto = (pelota1.y - (personaje1.y + personaje1.alto / 2)) / (personaje1.alto / 2);
      pelota1.direccionY = impacto;
      normalizarDireccion();
    }
  
    // Colisión con personaje2
    if (
      pelotaDer > personaje2Izq &&
      pelotaIzq < personaje2Der &&
      pelotaArriba > personaje2Abajo &&
      pelotaAbajo < personaje2Arriba
    ) {
      console.log("colision con 2")
      pelota1.direccionX = -1;
      let impacto = (pelota1.y - (personaje2.y2 + personaje2.alto / 2)) / (personaje2.alto / 2);
      pelota1.direccionY = impacto;
      normalizarDireccion();
    }
}

  function Persona() {
    this.x = 0;
    this.y = 0;
    this.ancho = 10;
    this.alto = 100;
    this.x2 = 585;
    this.y2 = 200;
    this.velocidad = 2;
  }

  Persona.prototype.generarPosicionAbajo = function () {
    this.y = this.y + this.velocidad;
    if (this.y > TOPEINFERIOR) this.y = TOPEINFERIOR;
    console.log("abajo " + this.y);
  };

  Persona.prototype.generarPosicionArriba = function () {
    this.y = this.y - this.velocidad;
    if (this.y < TOPESUPERIOR) this.y = TOPESUPERIOR;
    console.log("arriba " + this.y);
  };

  Persona.prototype.pintar = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue"; // Cambia el color del personaje
    ctx.fillRect(personaje1.x, personaje1.y, 10, 100);
    ctx.fillRect(personaje2.x2, personaje2.y2, 10, 100);
  };

  Persona.prototype.mover = function () {
    if (yUp) personaje1.generarPosicionArriba();
    if (yDown) personaje1.generarPosicionAbajo();

    //personaje2 mover prueba
    if (pelota1.y - 2 < personaje2.y2) personaje2.y2 -= 1;
    if (pelota1.y - 2 > personaje2.y2) personaje2.y2 += 1;
    if (personaje2.y2 > 300) {
      personaje2.y2 = 300;
    }
  };

  function animarPersonaje() {
    personaje1.pintar();
    personaje1.mover();

  }

  function activaMovimiento(evt) {
    switch (evt.keyCode) {
      case 38: // Up arrow
        yUp = true;
        break;
      case 40: // Down arrow
        yDown = true;
        break;
    }
  }

  function desactivaMovimiento(evt) {
    switch (evt.keyCode) {
      case 38: // Up arrow
        yUp = false;
        break;
      case 40: // Down arrow
        yDown = false;
        break;
    }
  }
  document.addEventListener("keydown", activaMovimiento, false);
  document.addEventListener("keyup", desactivaMovimiento, false);

  function iniciarJuego() {
    canvas = document.getElementById("JuegoCanva");
    ctx = canvas.getContext("2d");

    pelota1 = new Pelota();
    personaje1 = new Persona();
    personaje2 = new Persona();

    id = setInterval(animarPersonaje, 6);
    id2 = setInterval(animarPelota, 6);

    document.getElementById("botonInicio").disabled = true;
  }
};
