window.onload = function () {
  // Variables del DOM
  let puntuacionIzquierda = document.getElementById("puntuacionIzquierda");
  let puntuacionDerecha = document.getElementById("puntuacionDerecha");
  document.getElementById("botonBorrarGanadores").onclick = borrarGanadores;

  // Constantes
  const TOPE_INFERIOR = 400; // Altura máxima del canvas
  const TOPE_SUPERIOR = 0;

  // Variables del juego
  let puntosDerecha = 0;
  let puntosIzquierda = 0;
  let canvas, ctx;
  let pelota, jugador1, jugador2;
  let id;
  let teclaArriba = false;
  let teclaAbajo = false;
  let fpsJuego = 16;
  let golpeEnLosLados, GolpeConElJugador, Ganador;
  let juegoPausado = false; // Estado del juego
  let estadoJuego = false; // Estado del juego

  // Constructor de la pelota
  function Pelota() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
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
      if (this.y - this.radio <= TOPE_SUPERIOR || this.y + this.radio >= canvas.height) {
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

  // Constructor del jugador
  function Jugador(xInicial, yInicial, color, velocidad) {
    this.x = xInicial;
    this.y = yInicial;
    this.color = color;
    this.ancho = 10;
    this.alto = 100;
    this.velocidad = velocidad; // Velocidad ajustada

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

  // Verificar colisiones
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
      verificarPuntos(); // Verificar los puntos después de actualizar
    } else if (pelota.x + pelota.radio > canvas.width) {
      puntosIzquierda++;
      actualizarMarcador();
      resetPelota();
      verificarPuntos(); // Verificar los puntos despu��s de actualizar
    }
  }

  // Actualizar marcador
  function actualizarMarcador() {
    puntuacionIzquierda.innerHTML = `Puntuación Izquierda: ${puntosIzquierda}`;
    puntuacionDerecha.innerHTML = `Puntuación Derecha: ${puntosDerecha}`;
  }

  // Actualizar juego
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

  // Resetear pelota
  function resetPelota() {
    pelota.x = canvas.width / 2;
    pelota.y = canvas.height / 2;
    pelota.dx = 1.5 * (Math.random() > 0.5 ? 1 : -1); // Reducir la velocidad horizontal
    pelota.dy = 1 * (Math.random() > 0.5 ? 1 : -1);   // Reducir la velocidad vertical
  }

  // Resetear jugadores
  function resetJugadores() {
    jugador1.y = canvas.height / 2 - jugador1.alto / 2;
    jugador2.y = canvas.height / 2 - jugador2.alto / 2;
  }

  // Reiniciar juego
  function reiniciarJuego() {
    document.getElementById("botonInicio").disabled = true; // Desactivar el botón de inicio
    document.getElementById("botonPausa").disabled = true; // Desactivar el botón de pausa
    document.getElementById("botonPausa").innerText = "Pausar Juego"; // Restablecer el texto del botón de pausa

    // Reiniciar las variables a sus valores originales
    puntosIzquierda = 0;
    puntosDerecha = 0;
    teclaArriba = false;
    teclaAbajo = false;
    juegoPausado = false; // Reiniciar el estado del juego
    fpsJuego = 16; // Restablecer la velocidad del juego

    // Actualizar el marcador
    actualizarMarcador();
    resetJugadores();
    iniciarJuego();
  }

  // Verificar puntos
  function verificarPuntos() {
    if (puntosIzquierda === 3 || puntosDerecha === 3) {
      clearInterval(id);
      fpsJuego -= 5; // Aumentar la velocidad del juego
      id = setInterval(actualizarJuego, fpsJuego);
    }

    if (puntosIzquierda === 10 || puntosDerecha === 10) {
      clearInterval(id); // Detener el juego
      let ganador = puntosIzquierda === 10 ? "Jugador Izquierda" : "Jugador Derecha";
      reproducirAudio(Ganador); // Reproducir el audio de ganador
      let nombreGanador = prompt(ganador + " ha ganado el juego! Ingresa tu nombre:");
      almacenarGanador(nombreGanador, puntosIzquierda === 10 ? puntosIzquierda : puntosDerecha);
      actualizarListaGanadores();
      reiniciarJuego(); // Reiniciar el juego
    }
  }

  // Almacenar ganador
  function almacenarGanador(nombre, puntos) {
    let ganadores = JSON.parse(localStorage.getItem("ganadores")) || [];
    ganadores.push({ nombre: nombre, puntos: puntos });
    ganadores.sort((a, b) => b.puntos - a.puntos); // Ordenar por puntuación
    localStorage.setItem("ganadores", JSON.stringify(ganadores));
  }

  // Actualizar lista de ganadores
  function actualizarListaGanadores() {
    let ganadores = JSON.parse(localStorage.getItem("ganadores")) || [];
    let listaGanadores = document.getElementById("listaGanadores");
    listaGanadores.innerHTML = ""; // Limpiar la lista actual

    ganadores.forEach((ganador, index) => {
      let li = document.createElement("li");
      li.textContent = `${index + 1}. ${ganador.nombre} - ${ganador.puntos} puntos`;
      listaGanadores.appendChild(li);
    });
  }

  // Pausar juego
  function pausarJuego() {
    if (juegoPausado) {
      // Reanudar el juego
      id = setInterval(actualizarJuego, 16); // Aproximadamente 60 FPS
      document.getElementById("botonPausa").innerText = "Pausar Juego";
    } else {
      // Pausar el juego
      clearInterval(id);
      document.getElementById("botonPausa").innerText = "Reanudar Juego";
    }
    juegoPausado = !juegoPausado;
    document.getElementById("botonInicio").disabled = false; // Activar el botón de reinicio
    document.getElementById("botonInicio").innerText = "Reiniciar Juego"; // Cambiar el texto del botón de inicio
  }

  // Activar movimiento
  function activaMovimiento(evt) {
    if (evt.keyCode === 38) teclaArriba = true;
    if (evt.keyCode === 40) teclaAbajo = true;
  }

  // Desactivar movimiento
  function desactivaMovimiento(evt) {
    if (evt.keyCode === 38) teclaArriba = false;
    if (evt.keyCode === 40) teclaAbajo = false;
  }

  // Reproducir audio
  function reproducirAudio(audio) {
    audio.currentTime = 0;
    audio.play();
  }

  // Borrar ganadores
  function borrarGanadores() {
    localStorage.removeItem("ganadores");
    actualizarListaGanadores();
  }

  // Botón de inicio
  function botonInicio() {
    if (estadoJuego === false) {
      iniciarJuego();
      document.getElementById("botonInicio").innerText = "Reiniciar Juego";
    } else if (estadoJuego === true) {
      reiniciarJuego();
      document.getElementById("botonInicio").innerText = "Iniciar Juego";
    }
  }

  // Iniciar juego
  function iniciarJuego() {
    estadoJuego = true; // Iniciar el juego

    golpeEnLosLados = document.getElementById("golpeEnLosLados");
    GolpeConElJugador = document.getElementById("GolpeConElJugador");
    Ganador = document.getElementById("Ganador");

    canvas = document.getElementById("JuegoCanva");
    ctx = canvas.getContext("2d");

    pelota = new Pelota();
    jugador1 = new Jugador(20, canvas.height / 2 - 50, "#3498db", 2); // Jugador 1 con mayor velocidad
    jugador2 = new Jugador(canvas.width - 30, canvas.height / 2 - 50, "#e74c3c", 1); // Jugador 2 con velocidad normal

    if (id) {
      clearInterval(id); // Limpiar el intervalo de actualización del juego antes de iniciar uno nuevo
    }

    id = setInterval(actualizarJuego, fpsJuego); // Aproximadamente 60 FPS
    document.getElementById("botonInicio").disabled = true; // Desactivar el botón de inicio
    document.getElementById("botonPausa").disabled = false; // Activar el botón de pausa

    actualizarListaGanadores();
  }

  // Inicializar
  document.getElementById("botonPausa").disabled = true; // Activar el botón de pausa

  // Manejo de teclado
  document.addEventListener("keydown", activaMovimiento);
  document.addEventListener("keyup", desactivaMovimiento);

  document.getElementById("botonInicio").onclick = botonInicio;
  document.getElementById("botonPausa").onclick = pausarJuego;
};