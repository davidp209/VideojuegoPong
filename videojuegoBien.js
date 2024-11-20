windows.onload = function () {


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

        colisionDetectada();
     }
  function Persona() {
    this.x = 0;
    this.y = 0;
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


        moverPersonaje1();
        moverPersonaje2();
    };


    function moverPersonaje1() {
    
    
        if (yUp) personaje1.generarPosicionArriba();
        if (yDown) personaje1.generarPosicionAbajo();
    
    
    }
    function moverPersonaje2() {
    
    
        if (pelota1.y - 2 < personaje2.y2) personaje2.y2 -= 1;
        if (pelota1.y - 2 > personaje2.y2) personaje2.y2 += 1;
        if (personaje2.y2 > 300) {
          personaje2.y2 = 300;
        }
        //if (pelota1.y - 2 > personaje2.y2 && personaje2.y2 < canvas.height - 100) {
        //personaje2.y2 += 1;
      }
    

      function animarPersonaje() {

        personaje1.pintar()
        personaje1.MOVER();

      }
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
        id2 = setInterval(pelota1.pintar, 6);
    
        document.getElementById("botonInicio").disabled = true;
      }


    
    
