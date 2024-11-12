window.onload=function(){

//cuando se le de al boton se ejecuta la funcion de iniciar juego
   let boton= document.getElementById("botonInicio").onclick = iniciarJuego;
    const TAMAÑORECTANGULOX = 15;
	const TAMAÑORECTANGULOY = 15;
	const TAMAÑOCOMECOCOS = 30;
	const TOPEDERECHA   = 485;
	const TOPEIZQUIERDA = 0;
	const TOPEINFERIOR  = 485;
	const TOPESUPERIOR  = 0;

	let rectangulo ;

	let canvas;  // variable que referencia al elemento canvas del html
	let ctx;     // contexto de trabajo
	let id;      // id de la animación
	
	let xIzquierda, xDerecha, yUp, yDown;
	var img = new Image();
	img.src = 'assets/imagenes/comecocos.png';
	
	function Rectangulo () {
		
		this.x = 0;	
		this.y=0;		
		this.velocidad = 2;
	}
	

	Rectangulo.prototype.pintarRectangulo = function (){

		ctx.drawImage(img, this.x, this.y, TAMAÑOCOMECOCOS, TAMAÑOCOMECOCOS);
		}


	

	Rectangulo.prototype.generarPosicionDerecha = function(){
		
		this.x = this.x + this.velocidad;
		
		if (this.x > TOPEDERECHA) this.x = TOPEDERECHA;   		
		
		console.log("derecha " + this.x);			
	}
	
	Rectangulo.prototype.generarPosicionIzquierda = function(){
		
		this.x = this.x - this.velocidad;

		if (this.x < TOPEIZQUIERDA) this.x = TOPEIZQUIERDA;	   

		console.log("izquierda " + this.x);			
	}

	Rectangulo.prototype.generarPosicionAbajo = function() {
		
		this.y = this.y + this.velocidad;

		if (this.y > TOPEINFERIOR) this.y = TOPEINFERIOR;	   
		
		console.log("abajo " + this.y);
	}	

	Rectangulo.prototype.generarPosicionArriba = function() {
		
		this.y = this.y - this.velocidad;

		if (this.y < TOPESUPERIOR) this.y = TOPESUPERIOR;

		console.log("arriba " + this.y);
		
	}	

	function pintaRectangulo() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, 500, 500);
		
		if (xDerecha)    rectangulo.generarPosicionDerecha();	   		
		if (xIzquierda)  rectangulo.generarPosicionIzquierda();
		if (yUp)         rectangulo.generarPosicionArriba();
		if (yDown)       rectangulo.generarPosicionAbajo();
			
		rectangulo.pintarRectangulo();		
	}

	function activaMovimiento(evt) {

        switch (evt.keyCode) {
		
			// Left arrow.
			case 37:
			  xIzquierda = true;
			  break;

			// Right arrow.
			case 39:
			  xDerecha = true;
			  break;
		 
			  // Arriba
			case 38:
			  yUp = true;
			  break;

			  // Abajo.
			case 40:
			  yDown = true;
			  break;		 
		}
	}

	function desactivaMovimiento(evt){

        switch (evt.keyCode) {

			// Left arrow
			case 37: 
			  xIzquierda = false;
			  break;

			// Right arrow 
			case 39:
			  xDerecha = false;
			  break;
        
					  // Arriba
			case 38:
			  yUp = false;
			  break;

			  // Abajo.
			case 40:
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
	
	rectangulo = new Rectangulo();
	
	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 6);
    document.getElementById('botonInicio').disabled = true;

    }




}