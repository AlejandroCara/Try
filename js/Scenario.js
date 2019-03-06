class Scenario 
{
	constructor() {}

	initialize(config)
	{
		this.ctx = config.ctx;
		this.config = config;
        this.canvas = config.canvas;
        this.cape0 = new Image();
        this.cape0.src = "img/black.png";
        this.cape1 = new Image();
        this.cape1.src = "img/space.png";
        this.cape2 = new Image();
        this.cape2.src = "img/spacecape2.png";
        this.cape3 = new Image();
        this.cape3.src = "img/saturn.png";
        this.scrollCape1 = 0;
        this.scrollCape2 = 0;
        this.scrollCape3 = -400;
		this.music = document.createElement('audio');
        this.music.src = "sound/music.mp3"; 
		console.log("Scenario initialized");
	}

	/**
	* ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	* image: la pròpia imatge
	* sx i sy: on comença la imatge (cantonada superior esquerra)
	* sWidth i sHeight: on acaba la imatge (cantonada inferior dreta)
	* dx i dy: on comença el contenidor o canvas (cantonada superior esquerra)
	* dWidth i dHeight: on acaba el contenidor o canvas (cantonada inferior dreta)
	* Més informació: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	*/
	draw()
	{
        if (this.scrollCape1 >= this.canvas.height) {
	        this.scrollCape1 = 0;
		}	
        this.scrollCape1 += 0.40; 
        
        if (this.scrollCape2 >= this.canvas.height) {
	        this.scrollCape2 = 0;
		}	
        this.scrollCape2 += 0.80; 

        if (this.scrollCape3 >= this.canvas.height) {
            this.scrollCape3 = -600;
        }	
        
        this.scrollCape3 += 0.05; 

        this.ctx.drawImage(this.cape0, 0, 0);
		this.ctx.drawImage(this.cape1, 0, 0, this.canvas.width, this.canvas.height, 0, -this.canvas.height+this.scrollCape1, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.cape1, 0, 0, this.canvas.width, this.canvas.height, 0, this.scrollCape1, this.canvas.width, this.canvas.height);
        
        this.ctx.drawImage(this.cape2, 0, 0, this.canvas.width, this.canvas.height, 0, -this.canvas.height+this.scrollCape2, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.cape2, 0, 0, this.canvas.width, this.canvas.height, 0, this.scrollCape2, this.canvas.width, this.canvas.height);

        //this.ctx.drawImage(this.cape3, 0, 0, this.canvas.width, this.canvas.height, 0, -this.canvas.height+this.scrollCape3, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.cape3, 0, 0, this.canvas.width, this.canvas.height, 0, this.scrollCape3, this.canvas.width, this.canvas.height);

        /*if(startGame && !checkEnemies()){
            this.scrollCape1 += 0.80;
            this.scrollCape2 += 1.4;
            this.scrollCape3 += 0.10;
        }*/
    }
}