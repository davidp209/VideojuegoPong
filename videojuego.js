window.onload = function () {

  
  document.getElementById("botonInicio").onclick = iniciarJuego;
  let objetivo = document.getElementById("puntuacionIzquierda");


  const TOPEDERECHA = 300;
  const TOPEIZQUIERDA = 0;
  const TOPEINFERIOR = 300;
  const TOPESUPERIOR = 0;

  let puntosDerecha = 0;
  let puntosIzquierda = 0;

  let x = 0;
  let y = 0;

  let pelota1;
  let personaje1;
  let id;
  let id2;

  let xIzquierda, xDerecha, yUp, yDown;

  let valorX_posicion_inicial_pelota = 300;
  let valorY_posicion_inicial_pelota = 200;

  var dx = 2;
  var dy = -2;


  function Pelota() {
    this.x = 300;
    this.y = 200;
    this.width = 4;
    this.height = 4;
    velocidadPelota = 1; // Velocidad variable
    dx = velocidadPelota; // Direcciones de la pelota
    dy = -velocidadPelota;
  }

  function Persona() {
    this.x = 0;
    this.y = 0;
    this.x2 = 585;
    this.y2 = 200;
    this.velocidad = 2;
  }

  Persona.prototype.generarPosicionDerecha = function () {
    this.x = this.x + this.velocidad;
    if (this.x > TOPEDERECHA) this.x = TOPEDERECHA;
    console.log("derecha " + this.x);
  };

  Persona.prototype.generarPosicionIzquierda = function () {
    this.x = this.x - this.velocidad;
    if (this.x < TOPEIZQUIERDA) this.x = TOPEIZQUIERDA;
    console.log("izquierda " + this.x);
  };

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

  function pintarCirculo() {
    pelota1.x += dx; //le suma la posicion dela x mas la velocidad de direccion de x
    pelota1.y += dy;

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

    // Dibujar el círculo (pelota) en la nueva posición
    ctx.beginPath();
    ctx.arc(pelota1.x, pelota1.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    // Verificar la colisión con el personaje
    colisionDetectada();
  }

  function pintarPersona() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue"; // Cambia el color del personaje
    ctx.fillRect(personaje1.x, personaje1.y, 10, 100);

    if (yUp) personaje1.generarPosicionArriba();
    if (yDown) personaje1.generarPosicionAbajo();

    //--------------------Personaje2 -------------------
    ctx.fillRect(personaje2.x2, personaje2.y2, 10, 100);

    //Si la pelota está por encima de personaje2, el personaje se mueve hacia arriba (y2 -= 5).
    //Si la pelota está por debajo de personaje2, el personaje se mueve hacia abajo (y2 += 5)
    if (pelota1.y - 2 < personaje2.y2) personaje2.y2 -= 1;
    if (pelota1.y - 2 > personaje2.y2) personaje2.y2 += 1;
    if (personaje2.y2 > 300) {
      personaje2.y2 = 300;
    }
    //if (pelota1.y - 2 > personaje2.y2 && personaje2.y2 < canvas.height - 100) {
    //personaje2.y2 += 1;
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



  // Función para detectar la colisión
  function colisionDetectada() {

    // Verificar si la pelota choca con los bordes
    if (pelota1.x + pelota1.width > canvas.width || pelota1.x < 0) {
      dx = -dx; // Invertir la dirección en el eje X
    }
    if (pelota1.y + pelota1.height > canvas.height || pelota1.y < 0) {
      dy = -dy; // Invertir la dirección en el eje Y
    }

    const pelotaRadio = 10; // Radio de la pelota
    const personajeAncho = 10;
    const personajeAlto = 100;

    // Coordenadas de la pelota
    const pelotaCentroX = pelota1.x;
    const pelotaCentroY = pelota1.y;

    // Coordenadas del personaje
    const personajeX = personaje1.x;
    const personajeY = personaje1.y;
    const personajeX2 = personaje2.x2;
    const personajeY2 = personaje2.y2;

    // Verificar si la pelota colisiona con el personaje
    const colisionX = pelotaCentroX > personajeX && pelotaCentroX < personajeX + personajeAncho;
    const colisionY = pelotaCentroY > personajeY && pelotaCentroY < personajeY + personajeAlto;
    const colisionX2 =
      pelotaCentroX > personajeX2 &&
      pelotaCentroX < personajeX2 + personajeAncho;
    const colisionY2 =
      pelotaCentroY > personajeY2 &&
      pelotaCentroY < personajeY2 + personajeAlto;

    if (colisionX && colisionY) {
      console.log("¡Colisión detectada con el personaje 1!");
      if (pelotaCentroY < personajeY + personajeAlto / 2) {
        // Colisión en la parte superior del personaje
        dy = -Math.abs(dy);
      } else {
        // Colisión en la parte inferior del personaje
        dy = Math.abs(dy);
      }
      dx = -dx;
    }

    if (colisionX2 && colisionY2) {
      console.log("¡Colisión detectada con el personaje 2!");
      if (pelotaCentroY < personajeY2 + personajeAlto / 2) {
        // Colisión en la parte superior del personaje
        dy = -Math.abs(dy);
      } else {
        // Colisión en la parte inferior del personaje
        dy = Math.abs(dy);
      }
      dx = -dx;
    }
  }

  function iniciarJuego() {
    canvas = document.getElementById("JuegoCanva");
    ctx = canvas.getContext("2d");

    pelota1 = new Pelota();
    personaje1 = new Persona();
    personaje2 = new Persona();

    id = setInterval(pintarPersona, 6);
    id2 = setInterval(pintarCirculo, 6);

    document.getElementById("botonInicio").disabled = true;
  }
};
