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

  let fpsJuego = 16;

  let golpeEnLosLados, GolpeConElJugador;


  function Pelota() {
                      this.x = 300;
                      this.y = 200;
                      this.radio = 10; // Radio de la pelota
                      this.dx = 1.5; // Velocidad horizontal reducida
                      this.dy = 1;
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
                           reproducirAudio(golpeEnLosLados);
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

  function Jugador(xInicial, yInicial,color) {
    this.x = xInicial;
    this.y = yInicial;
    this.color = color;
    this.ancho = 10;
    this.alto = 100;
    this.velocidad = 1; // Velocidad ajustada

    this.dibujar = function () {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.ancho, this.alto);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

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
      reproducirAudio(GolpeConElJugador);


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
      reproducirAudio(GolpeConElJugador);


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

    if (pelota.y < jugador2.y + jugador2.alto / 2) {
      jugador2.mover("arriba");
    } else if (pelota.y > jugador2.y + jugador2.alto / 2) {
      jugador2.mover("abajo");
     
    }

    
    pelota.dibujar();
    jugador1.dibujar();
    jugador2.dibujar();
    pelota.actualizarAnimacion();

  }





  function botonReiniciar() { 
    clearInterval(id); // Detener la animación
    puntosIzquierda = 0;
    puntosDerecha = 0;
    actualizarMarcador();
    resetPelota();
    document.getElementById("botonInicio").disabled = false; // Desactivar el botón de inicio
    document.getElementById("botonReiniciar").disabled = true; // Activar el botón de reinicio

  }

  function activaMovimiento(evt) {
    if (evt.keyCode === 38) teclaArriba = true;
    if (evt.keyCode === 40) teclaAbajo = true;
}

function desactivaMovimiento(evt) {
    if (evt.keyCode === 38) teclaArriba = false;
    if (evt.keyCode === 40) teclaAbajo = false;
} 



function reproducirAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}





  function iniciarJuego() {

    golpeEnLosLados = document.getElementById("golpeEnLosLados");
    GolpeConElJugador = document.getElementById("GolpeConElJugador");

    
    canvas = document.getElementById("JuegoCanva");
    ctx = canvas.getContext("2d");

    pelota = new Pelota();
    jugador1 = new Jugador(20, canvas.height / 2 - 50,"#3498db"); // Jugador 1
    jugador2 = new Jugador(canvas.width - 30, canvas.height / 2 - 50,"#e74c3c"); // Jugador 2

    id = setInterval(actualizarJuego, fpsJuego); // Aproximadamente 60 FPS
    document.getElementById("botonInicio").disabled = true; // Desactivar el botón de inicio
    document.getElementById("botonReiniciar").disabled = false; // Activar el botón de reinicio

  }




  // Manejo de teclado
  document.addEventListener("keydown", activaMovimiento);
  document.addEventListener("keyup", desactivaMovimiento);

  document.getElementById("botonInicio").onclick = iniciarJuego;
  document.getElementById("botonReiniciar").onclick = botonReiniciar;

};