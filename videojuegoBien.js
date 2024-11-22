window.onload = function () {
  let puntuacionIzquierda = document.getElementById("puntuacionIzquierda");
  let puntuacionDerecha = document.getElementById("puntuacionDerecha");

  const TOPEDERECHA = 300;
  const TOPEIZQUIERDA = 0;
  const TOPEINFERIOR = 300;
  const TOPESUPERIOR = 0;

  let puntosDerecha = 0;
  let puntosIzquierda = 0;

  let posicion = 0; // Posición del array 0, 1, 2, 3, 4, 5, 6, 7

  let id, id2, id3;

  let ctx, canvas;

  let x = 0;
  let y = 0;

  let yUp, yDown;

  let valorX_posicion_inicial_pelota = 300;
  let valorY_posicion_inicial_pelota = 200;

  //var dx = 2;
  //var dy = -2;

  function Pelota() {
                    this.x = 300;
                    this.y = 200;
                    this.width = 10;
                    this.height = 50;
                    this.radio = 10;
                    this.direccionX = 1; // Dirección horizontal (1 para derecha, -1 para izquierda)
                    this.direccionY = 0; // Dirección vertical (basada en el impacto)
                    this.velocidadPelota = 1; // Velocidad variable
                    this.dx = this.velocidadPelota; // Direcciones de la pelota
                    this.dy = -this.velocidadPelota;
                    //animacion de la pelota
                    this.animacionPelota = [
                                            [0, 25],
                                            [396, 25],
                                            [793, 25],
                                            [1190, 25],
                                            ];
                    this.imagen = new Image();
                    this.imagen.src = "./assets/imagenes/PELOTA2.png";
                    this.posicion = 0; // Índice para la animación
                    this.tamañoX = 396; // Tamaño del sprite en X
                    this.tamañoY = 424; //
  }

  function actualizarAnimacion() {
    pelota1.posicion = (pelota1.posicion + 1) % 4; // Avanza a la siguiente posición y reinicia al llegar al final
  }

  Pelota.prototype.mover = function () {
    this.x += this.dx;
    this.y += this.dy;
    console.log("MOVER", this.x, this.y);
  };

  Pelota.prototype.pintar = function () {
    console.log("PINTAR: ", this.posicion);

    ctx.drawImage(
                  this.imagen, // Imagen completa con todos los comecocos (Sprite)
                  this.animacionPelota[this.posicion][0], // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                  this.animacionPelota[this.posicion][1], // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                  this.tamañoX, // Tamaño X del comecocos que voy a recortar para dibujar
                  this.tamañoY, // Tamaño Y del comecocos que voy a recortar para dibujar
                  this.x, // Posicion x de pantalla donde voy a dibujar el comecocos recortado
                  this.y, // Posicion y de pantalla donde voy a dibujar el comecocos recortado
                  36, // Tamaño X del comecocos que voy a dibujar
                  36
    ); // Tamaño Y del comecocos que voy a dibujar
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
      pelota1.dy = -pelota1.dy; // Invertir la dirección en el eje X
    }
    if (pelota1.y + pelota1.height > canvas.height || pelota1.y < 0) {
      pelota1.dy = -pelota1.dy; // Invertir la dirección en el eje Y
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
    // Definir las coordenadas de la pelota considerando su radio
    let pelotaIzq = pelota1.x - pelota1.radio;
    let pelotaDer = pelota1.x + pelota1.radio;
    let pelotaArriba = pelota1.y - pelota1.radio;
    let pelotaAbajo = pelota1.y + pelota1.radio;

    // Jugador 1 (izquierda)
    let personaje1Izq = personaje1.x;
    let personaje1Der = personaje1.x + personaje1.ancho;
    let personaje1Arriba = personaje1.y;
    let personaje1Abajo = personaje1.y + personaje1.alto;

    // Jugador 2 (derecha)
    let personaje2Izq = personaje2.x2;
    let personaje2Der = personaje2.x2 + personaje2.ancho;
    let personaje2Arriba = personaje2.y2;
    let personaje2Abajo = personaje2.y2 + personaje2.alto;

    // Colisión con el jugador 1 (izquierda)
    if (pelotaDer > personaje1Izq && pelotaIzq < personaje1Der &&
        pelotaAbajo > personaje1Arriba && pelotaArriba < personaje1Abajo) {
        // La pelota toca al jugador 1
        console.log("Colisión con personaje1 detectada");

        // Rebote horizontal: cambia la dirección de la pelota hacia la derecha
        pelota1.direccionX = 1;

        // Rebote vertical: Calculamos el impacto dependiendo de la posición vertical
        let impacto = (pelota1.y + pelota1.radio - (personaje1.y + personaje1.alto / 2)) / (personaje1.alto / 2);
        pelota1.direccionY = impacto; // Ajustar la dirección vertical
        normalizarDireccion(); // Normalizar para evitar velocidad extraña
    }

    // Colisión con el jugador 2 (derecha)
    if (pelotaDer > personaje2Izq && pelotaIzq < personaje2Der &&
        pelotaAbajo > personaje2Arriba && pelotaArriba < personaje2Abajo) {
        // La pelota toca al jugador 2
        console.log("Colisión con personaje2 detectada");

        // Rebote horizontal: cambia la dirección de la pelota hacia la izquierda
        pelota1.direccionX = -1;

        // Rebote vertical: Calculamos el impacto dependiendo de la posición vertical
        let impacto = (pelota1.y + pelota1.radio - (personaje2.y2 + personaje2.alto / 2)) / (personaje2.alto / 2);
        pelota1.direccionY = impacto; // Ajustar la dirección vertical
        normalizarDireccion(); // Normalizar para evitar velocidad extraña
    }
}

  function Persona() {
    this.x = 0;
    this.y = 0;
    this.ancho = 10;
    this.alto = 100;
    this.x2 = 550;
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
    colisionConJugador();
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

  function iniciarJuego() {
    canvas = document.getElementById("JuegoCanva");
    ctx = canvas.getContext("2d");

    pelota1 = new Pelota();
    personaje1 = new Persona();
    personaje2 = new Persona();

    id = setInterval(animarPersonaje, 6);
    id2 = setInterval(animarPelota, 6);
    id3 = setInterval(actualizarAnimacion, 1000 / 50);
  }

  document.addEventListener("keydown", activaMovimiento, false);
  document.addEventListener("keyup", desactivaMovimiento, false);
  document.getElementById("botonInicio").onclick = iniciarJuego;
};
