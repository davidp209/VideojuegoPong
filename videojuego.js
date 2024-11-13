window.onload = function() {
    // cuando se le da al botón se ejecuta la función de iniciar juego
   document.getElementById("botonInicio").onclick = iniciarJuego;

    
    const TOPEDERECHA = 485;
    const TOPEIZQUIERDA = 0;
    const TOPEINFERIOR = 485;
    const TOPESUPERIOR = 0;

    let x=0;        // posición inicial x del rectángulo
	let y=0;      // posición inicial y del rectángulo

    let pelota1;

    let posicion=0;   // Posición del array 0, 1


    let canvas;  // variable que referencia al elemento canvas del html
    let ctx;     // contexto de trabajo
    let id;      // id de la animación

    let xIzquierda, xDerecha, yUp, yDown;


    //Pelota ------------
    let vx = 2; // velocidad en x
    let vy = 2; // velocidad en y
    let g = 0; // gravedad
    let rebote = -0.5; // rebote al chocar con la pared
    //------------

    const movimientoDerecha =[[0,2],[32,2]];
	const moviminetoIzquierda =[[2,65],[33,65]];
	const movimientoAbajo =[[0,32],[32,32]];
	const movimientoArriba = [[0,97],[33,97]];

    function Pelota() {
        this.x = 300;
        this.y = 200;
        this.velocidad = 2; // establecer esto a través de variables arriba.
    }
	function Persona () {
		  this.x = 0;
	      this.y = 0;
        this.velocidad = 2; 
        
	}

    Persona.prototype.generarPosicionDerecha = function() {
        this.x = this.x + this.velocidad;
        if (this.x > TOPEDERECHA) this.x = TOPEDERECHA;
        console.log("derecha " + this.x);
    }

    Persona.prototype.generarPosicionIzquierda = function() {
        this.x = this.x - this.velocidad;
        if (this.x < TOPEIZQUIERDA) this.x = TOPEIZQUIERDA;
        console.log("izquierda " + this.x);
    }

    Persona.prototype.generarPosicionAbajo = function() {
        this.y = this.y + this.velocidad;
        if (this.y > TOPEINFERIOR) this.y = TOPEINFERIOR;
        console.log("abajo " + this.y);
    }

    Persona.prototype.generarPosicionArriba = function() {
        this.y = this.y - this.velocidad;
        if (this.y < TOPESUPERIOR) this.y = TOPESUPERIOR;
        console.log("arriba " + this.y);
    }

   
    function girar() {
		
        posicion = (posicion + 1) % 2;  // Cargará posiciones 0 y 1 del array
        /* Esta es la alternativa
            posicion ++;
            if(posicion>=1) posicion =0;
        */
    
}
function pintar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el círculo
    ctx.beginPath();
    ctx.arc(pelota1.x, pelota1.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    // Dibujar el personaje
    ctx.fillStyle = "blue"; // Cambia el color del personaje
    ctx.fillRect(personaje1.x, personaje1.y, 10, 100);

        if (xDerecha) personaje1.generarPosicionDerecha();
        if (xIzquierda) personaje1.generarPosicionIzquierda();
        if (yUp) personaje1.generarPosicionArriba();
        if (yDown) personaje1.generarPosicionAbajo();
  }
  function update() {
    // Actualizar la posición de la pelota según la velocidad y gravedad
    pelota1.x += vx;
    pelota1.y += vy;
    vy += g;

    // Rebote al chocar con la pared
    if (pelota1.x + 20 > canvas.width || pelota1.x - 20 < 0) {
        vx *= -1; // Invierte la velocidad en el eje x
    }
    if (pelota1.y + 20 > canvas.height || pelota1.y - 20 < 0) {
        vy *= 1; // Invierte la velocidad en el eje y
        vy *= 0; // Pérdida de energía en el rebote (ajusta el valor según sea necesario)
    }
}
  

    function activaMovimiento(evt) {
        switch (evt.keyCode) {
            case 37: // Left arrow
                xIzquierda = true;
                break;
            case 39: // Right arro
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

    function iniciarJuego() {
        // localizamos el canvas
        canvas = document.getElementById("JuegoCanva");

        // Generamos el contexto de trabajo
        ctx = canvas.getContext("2d");

        // Creamos una nueva pelota
        pelota1 = new Pelota();
		personaje1 =new Persona();

        // Lanzamos la animación
        id = setInterval(pintar, 6);  // Actualiza la pantalla cada 6ms
        setInterval(update, 16); // 16ms ≈ 60fps

        document.getElementById('botonInicio').disabled = true;
    }
}
