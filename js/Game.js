class Game {

	constructor() {
		this.spaceShip = new SpaceShip();
		this.scenario = new Scenario();
		this.keyboard = new Array();  // Array per desar les tecles premudes.
		this.config = new Object();  // Estructura de dades del joc amb informació per les classes associades.
		//this.gameLoaded = false;  // Per saber si l'usuari ha indicat que vol començar a jugar.
		this.history = new Array();
		this.startGame = false;
		this.title = new Image();
		this.timerToFlash = 0;
		this.lang = navigator.language;
		this.index = 0;
		this.historyText;
		this.historyTeller = new Array();
		this.yPosition = 40;
		this.timeLapse = 0;
		this.lineController = 0;
		this.startHistory = false;
		this.skipHistory = false;

	}

	initialize() {
		console.log("Game initialized");


		this.canvas = document.getElementById("canvas");

		if (this.canvas && this.canvas.getContext) {
			this.ctx = this.canvas.getContext("2d");
			if (this.ctx) {
				this.keyboardListener();

				/* Creo tota l'estructura de dades que em servirà per checkejar l'estat del joc */
				this.config.ctx = this.ctx;
				this.config.canvas = this.canvas;
				this.config.keyboard = this.keyboard;
				this.config.KEY_LEFT = 37; //Left
				this.config.KEY_UP = 38; //Up
				this.config.KEY_RIGHT = 39; //Right
				this.config.KEY_DOWN = 40;  //Down
				this.config.KEY_ENTER = 13; //Enter
				this.config.KEY_ESC = 27; //ESC
				this.title.src = "img/gameTitle.png";

				/* Passo l'estructura de dades als objectes de les classes que la poden necessitar */
				this.scenario.initialize(this.config);
				this.spaceShip.initialize(this.config);


				if (this.lang.startsWith("es") || this.lang.startsWith("ca")) {
					this.historyText = ["El Enjambre Zerg es una amalgama aterradora y despiadada de elementos",
						"biológicos. Extranjeros artrópodos avanzados. Dedicado a la búsqueda de la ",
						"perfección genética, los zerg cazan y asimilan implacablemente especies",
						"avanzadas a través del Galaxia, incorporando código genético útil en su propio.",
						"Se nombran el Enjambre por su capacidad de crear rápidamente tensiones, y el ",
						"implacable asaltos que emplean para aplastar a sus enemigos.",
						" ",
						"Junto a los protoss y terranos, los zerg se erigen como uno de los tres ",
						"dominantes Especies de la Vía Láctea y son universalmente temidas, odiadas y ",
						"cazadas como tales. El Enjambre en sí mismo constituye un tercio del poder del",
						" Sector Koprulu. Zerg permanecer en áreas de la galaxia fuera del sector de ",
						"Koprulu."
					];
				} else if (this.lang.startsWith("en")) {
					this.historyText = ["The Zerg Swarm is a terrifying and ruthless amalgamation of biologically ",
						"advanced, arthropodal aliens. Dedicated to the pursuit of genetic perfection,",
						"the zerg relentlessly hunt down and assimilate advanced species across the",
						"galaxy, incorporating useful genetic code into their own. They are named ",
						"the Swarm per their ability to rapidly create strains, and the relentless ",
						"assaults they employ to overwhelm their foes.",
						" ",
						"Alongside the protoss and terrans, the zerg stand as one of the three dominant",
						"species of the Milky Way and are universally feared, hated and hunted as such.",
						"The Swarm in itself makes up a third of the power of the Koprulu Sector. Zerg",
						"remain in areas of the galaxy outside the Koprulu sector.",];
				} else if (this.lang.startsWith("ko")) {
					this.historyText = ["Zerg Swarm은 생물학적으로 무서운 무자비한 합병이다. ",
						"첨단, 절지 동물 외계인. 유전 적 완성을 추구하는 데 전념하여,",
						"저그는 끊임없이 진보 된 종을 사냥하고 동화시킵니다.",
						"은하, 유용한 유전자 코드를 그들 자신의 것으로 통합. 그들은 지명된다",
						"스웜 (Swarm)은 신속하게 긴장감을 형성 할 수있는 능력을 지니고 있으며,",
						"그들이 적을 압도하기 위해 고용 한 폭행.",
						" ",
						"프로토스 (protoss)와 테란 (terrans)과 함께 저그 (zerg)는 3 대 지배 중 하나",
						"종의 은하수는 보편적으로 두려워하고 미움을받으며 사냥을합니다.",
						"스웜 자체는 코프 룰루 (Koprulu) 영역의 1/3을 차지합니다. 저그",
						"코프 룰루 (Koprulu) 섹터 밖의 은하 지역에 머무른다.",];
				}


				for (var i = 0; i < this.historyText.length; i++) {
					console.log("vvvv")
					this.historyTeller.push("");
				}

				this.update();
			}
			else
				alert("error_context");
		}
	}

	/**
	* Funció que escolta les tecles premudes i desa la informació a l'array keyboard.
	* Aquest array es desa dins de config i s'envia a les classes filles.
	*/
	keyboardListener() {
		// Necessito aquest workaround pel canvi de context entre l'objecte de classe Game i el listener del document.
		// És a dir, desar el context actual perquè sinó es perd dins la funció que manega l'esdeveniment keyup
		// o keydown. Si ho ho fes així i intentés buscar this.keyboard(...) no apuntaria al mateix keyboard
		// de l'objecte de classe Game.
		var call = this;

		addEvent(document, "keydown", function (e) {
			call.keyboard[e.keyCode] = true;
		});
		addEvent(document, "keyup", function (e) {
			call.keyboard[e.keyCode] = false;
		});

		function addEvent(element, eventName, func) {
			if (element.addEventListener) {
				//Per navegadors (Chrome, Firefox, Opera etc.)
				element.addEventListener(eventName, func, false);
			}
			else if (element.attachEvent) {
				//Per Internet Explorer
				element.attachEvent(eventName, func);
			}
		}
	}

	update() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.scenario.draw();

		if (this.startHistory && this.spaceShip.life > 0 /*&& !finalBossDefeated*/) {
			if((!this.startGame || this.lineController < this.historyText.length) && !this.skipHistory){ 
				this.drawHistory();

				if(!(this.lineController < this.historyText.length)){
                    if (this.keyboard[this.config.KEY_ENTER]) {
						this.skipHistory = true;
                        this.startGame = true;
					}
                } else {
					console.log("bb")
					if (this.keyboard[this.config.KEY_ESC]) {
						this.skipHistory = true;
                        this.startGame = true;
					}		
					
                }
			}
		} else if (!this.startGame) {
			this.drawTitleScreen();
			if (this.keyboard[this.config.KEY_ENTER]) {
				this.startHistory = true;
			}
		}

		window.requestAnimationFrame(this.update.bind(this));
	}


	drawTitleScreen() {
		if (this.timerToFlash > 500 && this.timerToFlash < 1000) {
			this.ctx.font = "30px Arial";
			this.ctx.fillStyle = "Yellow";
			this.ctx.fillText("Press Enter To Play", (this.canvas.width / 2) - 125, 600);

		} else if (this.timerToFlash > 1000) {
			this.timerToFlash = 0;
		} 
		this.timerToFlash+=10;
		this.ctx.drawImage(this.title, (this.canvas.width / 2) - 205, 0);
	}

	drawHistory() {
        if(this.lineController < this.historyText.length){
            if(this.timeLapse > 10){
                this.ctx.font = "20px Arial";
                this.ctx.fillStyle ="White";
                this.historyTeller[this.lineController] += (this.historyText[this.lineController].charAt(this.index));
                this.timeLapse = 0;
                this.index++;
            } else {
                this.timeLapse +=10
            }
            
            if(this.index == this.historyText[this.lineController].length){
                //yPosition+= 25;
                this.lineController++;
                this.index = 0;
            }
        }
        for(var j = 0; j < this.lineController+1; j++){
            if(this.historyTeller[j] != undefined){
                this.ctx.fillText(this.historyTeller[j], 40, ((j + 1) * 40));
            }
        }
        //ctx.fillText(historyTeller[lineController], 40, yPosition);
    }
}