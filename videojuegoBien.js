// window.onload = function () {
//   let puntuacionIzquierda = document.getElementById("puntuacionIzquierda");
//   let puntuacionDerecha = document.getElementById("puntuacionDerecha");

//   const TOPEDERECHA = 300;
//   const TOPEIZQUIERDA = 0;
//   const TOPEINFERIOR = 300;
//   const TOPESUPERIOR = 0;

//   let puntosDerecha = 0;
//   let puntosIzquierda = 0;

//   let posicion = 0; // Posición del array 0, 1, 2, 3, 4, 5, 6, 7

//   let id, id2, id3;

//   let ctx, canvas;

//   let x = 0;
//   let y = 0;

//   let yUp, yDown;

//   let valorX_posicion_inicial_pelota = 300;
//   let valorY_posicion_inicial_pelota = 200;

//   //var dx = 2;
//   //var dy = -2;

//   function Pelota() {
//                     this.x = 300;
//                     this.y = 200;
//                     this.width = 10;
//                     this.height = 50;
//                     this.radio = 10;
//                     this.direccionX = 1; // Dirección horizontal (1 para derecha, -1 para izquierda)
//                     this.direccionY = 0; // Dirección vertical (basada en el impacto)
//                     this.velocidadPelota = 1; // Velocidad variable
//                     this.dx = this.velocidadPelota; // Direcciones de la pelota
//                     this.dy = -this.velocidadPelota;
//                     //animacion de la pelota
//                     this.animacionPelota = [
//                                             [0, 25],
//                                             [396, 25],
//                                             [793, 25],
//                                             [1190, 25],
//                                             ];
//                     this.imagen = new Image();
//                     this.imagen.src = "./assets/imagenes/PELOTA2.png";
//                     this.posicion = 0; // Índice para la animación
//                     this.tamañoX = 396; // Tamaño del sprite en X
//                     this.tamañoY = 424; //
//   }

//   function actualizarAnimacion() {
//     pelota1.posicion = (pelota1.posicion + 1) % 4; // Avanza a la siguiente posición y reinicia al llegar al final
//   }

//   Pelota.prototype.mover = function () {
//     this.x += this.dx;
//     this.y += this.dy;
//     console.log("MOVER", this.x, this.y);
//   };

//   Pelota.prototype.pintar = function () {
//     console.log("PINTAR: ", this.posicion);

//     ctx.drawImage(
//                   this.imagen, // Imagen completa con todos los comecocos (Sprite)
//                   this.animacionPelota[this.posicion][0], // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
//                   this.animacionPelota[this.posicion][1], // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
//                   this.tamañoX, // Tamaño X del comecocos que voy a recortar para dibujar
//                   this.tamañoY, // Tamaño Y del comecocos que voy a recortar para dibujar
//                   this.x, // Posicion x de pantalla donde voy a dibujar el comecocos recortado
//                   this.y, // Posicion y de pantalla donde voy a dibujar el comecocos recortado
//                   36, // Tamaño X del comecocos que voy a dibujar
//                   36
//     ); // Tamaño Y del comecocos que voy a dibujar
//   };

//   function marcador() {
//     if (pelota1.x == 0) {
//       //diciendole que el ejex  es doble o triple igual a 0 decimos que cuando toque el borde de la izquierda

//       puntosIzquierda++; //sumo los puntos

//       pelota1.x = valorX_posicion_inicial_pelota; // una vez contado los puntos lo que hago es que regreso la pelota al origen.
//       pelota1.y = valorY_posicion_inicial_pelota; // lo hago para las dos posiciones.

//       let objetivo = document.getElementById("puntuacionIzquierda"); // cojo la etiqueta que he hecho en el html y le asigono una variable
//       objetivo.innerHTML = "Puntuacion Izquierda: " + puntosIzquierda; // con esa variable de antes le digo que me escriba en el html el numero que quiero.

//       //------------------------------------BORRAR-------------------------------------
//       console.log(puntosIzquierda + "puntos izquierda "); // para comprobarlo en la consola
//       //------------------------------------BORRAR-------------------------------------
//     }

//     if (pelota1.x == 590) {
//       // si no pongo doble o triple no compara

//       puntosDerecha++;

//       pelota1.x = valorX_posicion_inicial_pelota; // una vez contado los puntos lo que hago es que regreso la pelota al origen.
//       pelota1.y = valorY_posicion_inicial_pelota; // lo hago para las dos posiciones.

//       let objetivo = document.getElementById("puntuacionDerecha"); // cojo la etiqueta que he hecho en el html y le asigono una variable
//       objetivo.innerHTML = "Puntuacion Derecha: " + puntosDerecha; // con esa variable de antes le digo que me escriba en el html el numero que quiero.

//       //------------------------------------BORRAR-------------------------------------
//       console.log(puntosDerecha + "puntos derecha");
//       //------------------------------------BORRAR-------------------------------------
//     }
//   }

//   function colisionDetectada() {
//     // Verificar si la pelota choca con los bordes
//     if (pelota1.x + pelota1.width > canvas.width || pelota1.x < 0) {
//         pelota1.dy = -pelota1.dy; // Invertir la dirección en el eje X
//     }
//     if (pelota1.y + pelota1.height > canvas.height || pelota1.y < 0) {
//         pelota1.dy = -pelota1.dy; // Invertir la dirección en el eje Y
//     }
// }


//   function animarPelota() {
//     pelota1.mover();
//     pelota1.pintar();
//     marcador();
//     colisionConJugador();
//     colisionDetectada();
//   }
//   function colisionConJugador() {
//     // Bordes de la pelota
//     let pelotaIzq = pelota1.x;
//     let pelotaDer = pelota1.x + pelota1.radio;
//     let pelotaArriba = pelota1.y;
//     let pelotaAbajo = pelota1.y + pelota1.radio;

//     // Bordes del jugador 1
//     let jugador1Izq = personaje1.x;
//     let jugador1Der = personaje1.x + personaje1.ancho;
//     let jugador1Arriba = personaje1.y;
//     let jugador1Abajo = personaje1.y + personaje1.alto - 10; // Ajuste por el sprite del jugador

//     // Bordes del jugador 2
//     let jugador2Izq = personaje2.x2;
//     let jugador2Der = personaje2.x2 + personaje2.ancho;
//     let jugador2Arriba = personaje2.y2;
//     let jugador2Abajo = personaje2.y2 + personaje2.alto - 10; // Ajuste por el sprite del jugador

//     // Colisión con jugador 1
//     if (
//         pelotaDer > jugador1Izq &&              // Pelota toca borde derecho del jugador
//         pelotaIzq < jugador1Der - 20 &&         // Pelota toca borde izquierdo del jugador
//         pelotaAbajo > jugador1Arriba &&         // Pelota toca borde superior del jugador
//         pelotaArriba < jugador1Abajo           // Pelota toca borde inferior del jugador
//     ) {
      
//       pelota1.direccionX = Math.abs(pelota1.direccionX); // Rebota a la izquierda

//       pelota1.x = jugador1Der; // Ajusta posición fuera del jugador


//       // Calcula el ángulo basado en la posición relativa del impacto

//       let impacto = (pelota1.y - (jugador2.y2 + jugador2.alto / 2)) / (jugador2.alto / 2);

//       pelota1.direccionY = impacto * 1.5; // Ajusta el ángulo con factor de rebote más realista

//       normalizarDireccion();
//     }

//     // Colisión con jugador 2
//     if (
//         pelotaIzq < jugador2Der - 20 &&           // Pelota toca borde derecho del jugador
//         pelotaDer > jugador2Izq &&               // Pelota toca borde izquierdo del jugador
//         pelotaAbajo > jugador2Arriba &&          // Pelota toca borde superior del jugador
//         pelotaArriba < jugador2Abajo            // Pelota toca borde inferior del jugador
//     ) {
//         pelota1.direccionX = -Math.abs(pelota1.direccionX); // Rebota a la izquierda
//         pelota1.x = jugador2Izq - pelota1.radio; // Ajusta posición fuera del jugador

//         // Calcula el ángulo basado en la posición relativa del impacto
//         let impacto = (pelota1.y - (personaje2.y2 + personaje2.alto / 2)) / (personaje2.alto / 2);
//         pelota1.direccionY = impacto * 1.5; // Ajusta el ángulo con factor de rebote más realista

//         normalizarDireccion();
//     }
// }


// function normalizarDireccion() {
//   // Asegura que la dirección no sea demasiado plana o inclinada
//   let velocidadTotal = Math.sqrt(pelota1.direccionX ** 2 + pelota1.direccionY ** 2);
//   pelota1.direccionX /= velocidadTotal;
//   pelota1.direccionY /= velocidadTotal;
// }

//   function Persona() {
//     this.x = 0;
//     this.y = 0;
//     this.ancho = 10;
//     this.alto = 100;
//     this.x2 = 550;
//     this.y2 = 200;
//     this.velocidad = 2;
//   }

//   Persona.prototype.generarPosicionAbajo = function () {
//     this.y = this.y + this.velocidad;
//     if (this.y > TOPEINFERIOR) this.y = TOPEINFERIOR;
//     console.log("abajo " + this.y);
//   };

//   Persona.prototype.generarPosicionArriba = function () {
//     this.y = this.y - this.velocidad;
//     if (this.y < TOPESUPERIOR) this.y = TOPESUPERIOR;
//     console.log("arriba " + this.y);
//   };

//   Persona.prototype.pintar = function () {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "blue"; // Cambia el color del personaje
//     ctx.fillRect(personaje1.x, personaje1.y, 10, 100);
//     ctx.fillRect(personaje2.x2, personaje2.y2, 10, 100);
// };


//   Persona.prototype.mover = function () {
//     if (yUp) personaje1.generarPosicionArriba();
//     if (yDown) personaje1.generarPosicionAbajo();

//     //personaje2 mover prueba
//     if (pelota1.y - 2 < personaje2.y2) personaje2.y2 -= 1;
//     if (pelota1.y - 2 > personaje2.y2) personaje2.y2 += 1;
//     if (personaje2.y2 > 300) {
//       personaje2.y2 = 300;
//     }
//   };

//   function animarPersonaje() {
//     personaje1.pintar();
//     personaje1.mover();
//     colisionConJugador();
//   }

//   function activaMovimiento(evt) {
//     switch (evt.keyCode) {
//       case 38: // Up arrow
//         yUp = true;
//         break;
//       case 40: // Down arrow
//         yDown = true;
//         break;
//     }
//   }

//   function desactivaMovimiento(evt) {
//     switch (evt.keyCode) {
//       case 38: // Up arrow
//         yUp = false;
//         break;
//       case 40: // Down arrow
//         yDown = false;
//         break;
//     }
//   }

//   function iniciarJuego() {
//     canvas = document.getElementById("JuegoCanva");
//     ctx = canvas.getContext("2d");

//     pelota1 = new Pelota();
//     personaje1 = new Persona();
//     personaje2 = new Persona();

//     id = setInterval(animarPersonaje, 6);
//     id2 = setInterval(animarPelota, 6);
//     id3 = setInterval(actualizarAnimacion, 1000 / 50);
//   }

//   document.addEventListener("keydown", activaMovimiento, false);
//   document.addEventListener("keyup", desactivaMovimiento, false);
//   document.getElementById("botonInicio").onclick = iniciarJuego;
// };

window.onload = function () {
  let puntuacionIzquierda = document.getElementById("puntuacionIzquierda");
  let puntuacionDerecha = document.getElementById("puntuacionDerecha");

  const TOPE_INFERIOR = 400; // Altura máxima del canvas
  const TOPE_SUPERIOR = 0;

  let puntosDerecha = 0;
  let puntosIzquierda = 0;

  let canvas, ctx;
  let pelota, jugador1, jugador2;

  let teclaArriba = false;
  let teclaAbajo = false;

  function Pelota() {
    this.x = 300;
    this.y = 200;
    this.radio = 10; // Radio de la pelota
    this.dx = 3; // Velocidad horizontal
    this.dy = 2; // Velocidad vertical
    this.sprite = new Image();
    this.sprite.src = "./assets/imagenes/PELOTA2.png";
    this.animacion = [
      [0, 25],
      [396, 25],
      [793, 25],
      [1190, 25],
    ];
    this.tamañoX = 396; // Tamaño X del sprite original
    this.tamañoY = 424; // Tamaño Y del sprite original
    this.posicion = 0; // Frame actual del sprite

    this.dibujar = function () {
      ctx.drawImage(
        this.sprite,
        this.animacion[this.posicion][0], // Recorte X
        this.animacion[this.posicion][1], // Recorte Y
        this.tamañoX,
        this.tamañoY,
        this.x - 18, // Ajuste X para centrar
        this.y - 18, // Ajuste Y para centrar
        36,
        36
      );
    };

    this.mover = function () {
      this.x += this.dx;
      this.y += this.dy;

      // Rebote en los bordes superior e inferior
      if (this.y - this.radio <= TOPE_SUPERIOR || this.y + this.radio >= TOPE_INFERIOR) {
        this.dy = -this.dy;
      }

      // Evitar trayectorias rectas
      if (Math.abs(this.dy) < 1) {
        this.dy += Math.random() > 0.5 ? 1 : -1; // Ajuste leve a la dirección vertical
      }
    };

    this.actualizarAnimacion = function () {
      this.posicion = (this.posicion + 1) % 4; // Avanzar entre frames del sprite
    };
  }

  function Jugador(xInicial, yInicial) {
    this.x = xInicial;
    this.y = yInicial;
    this.ancho = 10;
    this.alto = 100;
    this.velocidad = 2.5; // Velocidad ajustada

    this.dibujar = function () {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    };

    this.mover = function (direccion) {
      if (direccion === "arriba" && this.y > TOPE_SUPERIOR) {
        this.y -= this.velocidad;
      } else if (direccion === "abajo" && this.y + this.alto < TOPE_INFERIOR) {
        this.y += this.velocidad;
      }
    };
  }

  function verificarColisiones() {
    // Colisión con el jugador 1
    if (
      pelota.x - pelota.radio <= jugador1.x + jugador1.ancho &&
      pelota.y >= jugador1.y &&
      pelota.y <= jugador1.y + jugador1.alto
    ) {
      pelota.dx = Math.abs(pelota.dx); // Rebota hacia la derecha

      // Ángulo de rebote según posición del impacto
      let impacto = (pelota.y - (jugador1.y + jugador1.alto / 2)) / (jugador1.alto / 2);
      pelota.dy = impacto * 3; // Factor ajustado para realismo
    }

    // Colisión con el jugador 2
    if (
      pelota.x + pelota.radio >= jugador2.x &&
      pelota.y >= jugador2.y &&
      pelota.y <= jugador2.y + jugador2.alto
    ) {
      pelota.dx = -Math.abs(pelota.dx); // Rebota hacia la izquierda

      // Ángulo de rebote según posición del impacto
      let impacto = (pelota.y - (jugador2.y + jugador2.alto / 2)) / (jugador2.alto / 2);
      pelota.dy = impacto * 3; // Factor ajustado para realismo
    }

    // Puntos para los jugadores
    if (pelota.x - pelota.radio < 0) {
      puntosDerecha++;
      actualizarMarcador();
      resetPelota();
    } else if (pelota.x + pelota.radio > canvas.width) {
      puntosIzquierda++;
      actualizarMarcador();
      resetPelota();
    }
  }

  function actualizarMarcador() {
    puntuacionIzquierda.innerHTML = `Puntuación Izquierda: ${puntosIzquierda}`;
    puntuacionDerecha.innerHTML = `Puntuación Derecha: ${puntosDerecha}`;
  }

  function resetPelota() {
    pelota.x = canvas.width / 2;
    pelota.y = canvas.height / 2;
    pelota.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
    pelota.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
  }

  function actualizarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas

    pelota.mover();
    verificarColisiones();

    if (teclaArriba) jugador1.mover("arriba");
    if (teclaAbajo) jugador1.mover("abajo");

    // IA básica para el jugador 2
    if (pelota.y < jugador2.y + jugador2.alto / 2) {
      jugador2.mover("arriba");
    } else if (pelota.y > jugador2.y + jugador2.alto / 2) {
      jugador2.mover("abajo");
    }

    pelota.dibujar();
    jugador1.dibujar();
    jugador2.dibujar();
    pelota.actualizarAnimacion();

    requestAnimationFrame(actualizarJuego);
  }

  function iniciarJuego() {
    canvas = document.getElementById("JuegoCanva");
    ctx = canvas.getContext("2d");

    pelota = new Pelota();
    jugador1 = new Jugador(20, canvas.height / 2 - 50); // Jugador 1
    jugador2 = new Jugador(canvas.width - 30, canvas.height / 2 - 50); // Jugador 2

    actualizarJuego();
  }

  // Manejo de teclado
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "ArrowUp") teclaArriba = true;
    if (evt.key === "ArrowDown") teclaAbajo = true;
  });

  document.addEventListener("keyup", function (evt) {
    if (evt.key === "ArrowUp") teclaArriba = false;
    if (evt.key === "ArrowDown") teclaAbajo = false;
  });

  document.getElementById("botonInicio").onclick = iniciarJuego;
};