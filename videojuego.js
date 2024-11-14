window.onload = function () {
  document.getElementById("botonInicio").onclick = iniciarJuego;

  const TOPEDERECHA = 300;
  const TOPEIZQUIERDA = 0;
  const TOPEINFERIOR = 300;
  const TOPESUPERIOR = 0;

  const puntosDerecha =0;
 const puntosIzquierda =0;

  let x = 0;
  let y = 0;

  let pelota1;
  let personaje1;
  let id;
  let id2;

  let xIzquierda, xDerecha, yUp, yDown;

  var dx = 2;
  var dy = -2;

  const movimientoDerecha = [
    [0, 2],
    [32, 2],
  ];
  const moviminetoIzquierda = [
    [2, 65],
    [33, 65],
  ];
  const movimientoAbajo = [
    [0, 32],
    [32, 32],
  ];
  const movimientoArriba = [
    [0, 97],
    [33, 97],
  ];

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
    pelota1.x += dx;//le suma la posicion dela x mas la velocidad de direccion de x
    pelota1.y += dy;

    // Verificar si la pelota choca con los bordes
    if (pelota1.x + pelota1.width > canvas.width || pelota1.x < 0) {

      dx = -dx; // Invertir la dirección en el eje X

    }
    if (pelota1.y + pelota1.height > canvas.height || pelota1.y < 0) {
      dy = -dy; // Invertir la dirección en el eje Y

    }
    if (pelota1.x + pelota1.width > canvas.width || pelota1.x < 0) {

      console.log(puntosDerecha +1)
  
      }
      if (pelota1.y + pelota1.height > canvas.height || pelota1.y < 0) {
        console.log(puntosDerecha +1)
  
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

    if (xDerecha) personaje1.generarPosicionDerecha();
    if (xIzquierda) personaje1.generarPosicionIzquierda();
    if (yUp) personaje1.generarPosicionArriba();
    if (yDown) personaje1.generarPosicionAbajo();
  }

  function activaMovimiento(evt) {
    switch (evt.keyCode) {
      case 37: // Left arrow
        xIzquierda = true;
        break;
      case 39: // Right arrow
        xDerecha = true;
        break;
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
      case 37: // Left arrow
        xIzquierda = false;
        break;
      case 39: // Right arrow
        xDerecha = false;
        break;
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
    const pelotaRadio = 10; // Radio de la pelota
    const personajeAncho = 20;
    const personajeAlto = 100;

    // Coordenadas de la pelota
    const pelotaCentroX = pelota1.x;
    const pelotaCentroY = pelota1.y;

    // Coordenadas del personaje
    const personajeX = personaje1.x;
    const personajeY = personaje1.y;

    // Verificar si la pelota colisiona con el personaje
    const colisionX =
      pelotaCentroX > personajeX && pelotaCentroX < personajeX + personajeAncho;
    const colisionY =
      pelotaCentroY > personajeY && pelotaCentroY < personajeY + personajeAlto;

    if (colisionX && colisionY) {
      console.log("¡Colisión detectada!");
      // Aquí puedes agregar lo que quieres hacer cuando ocurra la colisión, por ejemplo, cambiar la dirección de la pelota.
      dx = -dx;
      dy = -dy;
    }
  }

  function iniciarJuego() {
    canvas = document.getElementById("JuegoCanva");
    ctx = canvas.getContext("2d");

    pelota1 = new Pelota();
    personaje1 = new Persona();

    id = setInterval(pintarPersona, 6);
    id2 = setInterval(pintarCirculo, 6);

    document.getElementById("botonInicio").disabled = true;
  }
};
