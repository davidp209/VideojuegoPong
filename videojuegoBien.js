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

    let x = 0;
    let y = 0;

    let  yUp, yDown;

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
        }
        
      Pelota.prototype.mover = function () {
        this.x += dx;
        this.y += dy;
      }

      Pelota.prototype.pintar = function () {
        ctx.beginPath();
        ctx.arc(pelota1.x, pelota1.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();  

     }
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
      let magnitud = Math.sqrt(pelota.direccionX ** 2 + pelota.direccionY ** 2);
      pelota.direccionX /= magnitud;
      pelota.direccionY /= magnitud;
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
        colisionDetectada();
        colisionConJugador();

      }

function colisionConJugador() {

      let pelotaIzq = pelota.x - pelota.radio;
      let pelotaDer = pelota.x + pelota.radio;
      let pelotaArriba = pelota.y - pelota.radio;
      let pelotaAbajo = pelota.y + pelota.radio;

      let jugador1Izq = jugador1.x;
      let jugador1Der = jugador1.x + jugador1.ancho;
      let jugador1Arriba = jugador1.y;
      let jugador1Abajo = jugador1.y + jugador1.alto;

      let jugador2Izq = jugador2.x2;
      let jugador2Der = jugador2.x2 + jugador2.ancho;
      let jugador2Arriba = jugador2.y2;
      let jugador2Abajo = jugador2.y2 + jugador2.alto;

      if (
          pelotaIzq < jugador1Der &&
          pelotaDer > jugador1Izq &&
          pelotaArriba < jugador1Abajo &&
          pelotaAbajo > jugador1Arriba
      ) {
          pelota.direccionX = 1;
          let impacto = (pelota.y - (jugador1.y + jugador1.alto / 2)) / (jugador1.alto / 2);
          pelota.direccionY = impacto;
          normalizarDireccion();
      }

      if (
          pelotaIzq < jugador2Der &&
          pelotaDer > jugador2Izq &&
          pelotaArriba < jugador2Abajo &&
          pelotaAbajo > jugador2Arriba
      ) {
          pelota.direccionX = -1;
          let impacto = (pelota.y2 - (jugador2.y2 + jugador2.alto / 2)) / (jugador2.alto / 2);
          pelota.direccionY = impacto;
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

    
  }

    Persona.prototype.pintar = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue"; // Cambia el color del personaje
        ctx.fillRect(personaje1.x, personaje1.y, 10, 100);
        ctx.fillRect(personaje2.x2, personaje2.y2, 10, 100);

    }

    Persona.prototype.mover = function () {
        if (yUp) personaje1.generarPosicionArriba();
        if (yDown) personaje1.generarPosicionAbajo();

        //personaje2 mover prueba 
        if (pelota1.y - 2 < personaje2.y2) personaje2.y2 -= 1;
        if (pelota1.y - 2 > personaje2.y2) personaje2.y2 += 1;
        if (personaje2.y2 > 300) {
          personaje2.y2 = 300;
        }
      } 

    
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


    
    
    }
    