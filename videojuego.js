window.onload = function() {
    // cuando se le da al botón se ejecuta la función de iniciar juego
    let boton = document.getElementById("botonInicio").onclick = iniciarJuego;

    
    const TOPEDERECHA = 485;
    const TOPEIZQUIERDA = 0;
    const TOPEINFERIOR = 485;
    const TOPESUPERIOR = 0;

    let pelota1;

    let canvas;  // variable que referencia al elemento canvas del html
    let ctx;     // contexto de trabajo
    let id;      // id de la animación

    let xIzquierda, xDerecha, yUp, yDown;

    function Pelota() {
        this.x = 300;
        this.y = 200;
        this.velocidad = 2; // establecer esto a través de variables arriba.
    }
	function Persona(){
		this.x = 300;
        this.y = 200;
        this.velocidad = 2; // establecer esto a través de variables arriba
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

    function pintarCirculo() {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar el círculo
        ctx.beginPath();
        ctx.arc(pelota1.x, pelota1.y, 20, 0, 2 * Math.PI); // Se ajusta el tamaño y la posición
        ctx.fillStyle = "red";
        ctx.fill();

    }
	function pintarPersona(){
		
 // Limpiar el canvas
		 ctx.clearRect(0, 0, canvas.width, canvas.height);

 // Dibujar el cuadrado
 ctx.fillStyle = "red";
 ctx.fillRect(20,20,10,100);

 // Actualizar la posición de la pelota si es necesario
 		if (xDerecha) Personaje1.generarPosicionDerecha();
 		if (xIzquierda) Personaje1.generarPosicionIzquierda();
 		if (yUp) Personaje1.generarPosicionArriba();
 		if (yDown) Personaje1.generarPosicionAbajo();
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

    function iniciarJuego() {
        // localizamos el canvas
        canvas = document.getElementById("JuegoCanva");

        // Generamos el contexto de trabajo
        ctx = canvas.getContext("2d");

        // Creamos una nueva pelota
        pelota1 = new Pelota();
		Personaje1 =new Persona();

        // Lanzamos la animación
        id = setInterval(pintarPersona, 6);  // Actualiza la pantalla cada 6ms
        document.getElementById('botonInicio').disabled = true;
    }
}
