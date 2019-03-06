/**
* Aquesta classe tindrà, a part del constructor, dos mètodes "públics": initialize() i draw().
* La funció moveSpaceShip() serà "privada". Com que estrictament no existeix l'encapsulació en JavaScript,
* per fer privada la funció moveSpaceShip() cal passar-li el context (this) de la classe Player, perquè sinó
* no podrà accedir a les seves variables.
*/
class SpaceShip {
	constructor() { }

	initialize(config) {
		/**
		* La mida de la nau, així com la seva velocitat, sempre serà relatiu a la mida del canvas.
		* Si no es fes així, la jugabilitat es veuria afectada en funció de la mida de la pantalla.
		* Per exemple, si el desplaçament és un valor absolut, tardariem més en desplaçar-nos si
		* la pantalla és de 1920x1080 respecte a 640x480.
		*/
		this.config = config;
		this.ctx = config.ctx;
		this.keyboard = config.keyboard;
		this.width = config.canvas.width / 15;
		this.height = config.canvas.width / 15;
		this.x = (config.canvas.width / 2) - (this.width / 2);
		this.y = (config.canvas.height * 0.85) - this.height;
		this.limitTop = 0;
		this.limitBottom = config.canvas.height;
		this.limitLeft = 0;
		this.life = 5;
		this.limitRight = config.canvas.width;
		this.shiftX = this.width / 8; // desplaçament en l'eix de les X (avança 1/8 de la seva mida)
		this.shiftY = this.height / 8; // desplaçament en l'eix de les Y (avança 1/8 de la seva mida)
		console.log("Player initialized");
	}

	draw() {
		moveSpaceShip(this);
		this.ctx.drawImage(this.config.imgPlayer, this.x, this.y, this.width, this.height);

		function moveSpaceShip(context) {
			if (context.keyboard[context.config.KEY_UP]) {
				context.y -= context.shiftY;
				if (context.y <= context.limitLeft) context.y = context.limitTop;
			}

			if (context.keyboard[context.config.KEY_DOWN]) {
				context.y += context.shiftY;
				if (context.y >= (context.limitBottom - context.height)) context.y = (context.limitBottom - context.height);
			}

			if (context.keyboard[context.config.KEY_LEFT]) {
				context.x -= context.shiftX;
				if (context.x <= context.limitLeft) context.x = context.limitLeft;
			}

			if (context.keyboard[context.config.KEY_RIGHT]) {
				context.x += context.shiftX;
				if (context.x >= (context.limitRight - context.width)) context.x = (context.limitRight - context.width);
			}
		}
	}
}