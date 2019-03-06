window.addEventListener("load", function () {
    if(document.getElementsByClassName("game")[0].clientHeight > window.innerHeight){
        //document.getElementsByClassName("game")[0].setAttribute("style", "height:"+window.innerHeight+"px;");
        document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
        
    } else if(document.getElementsByClassName("game")[0].clientHeight <= window.innerHeight){
        //document.getElementsByClassName("game")[0].setAttribute("style", "height:"+window.innerHeight+"px;");
        document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
    }

    if(document.getElementsByClassName("game")[0].clientWidth > window.innerWidth){
        //document.getElementsByClassName("game")[0].removeAttribute("style");
        //document.getElementsByClassName("game")[0].setAttribute("style", "height:"+window.innerWidth+"px;");
        document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerWidth+"px;");
    }
    
    window.addEventListener("resize", function(){
        if(document.getElementsByClassName("game")[0].clientHeight > window.innerHeight){
           // document.getElementsByClassName("game")[0].setAttribute("style", "height:"+window.innerHeight+"px;");
            document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
            
        } else if(document.getElementsByClassName("game")[0].clientHeight <= window.innerHeight){
            //document.getElementsByClassName("game")[0].setAttribute("style", "height:"+window.innerHeight+"px;");
            document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
        }

        if(document.getElementsByClassName("game")[0].clientWidth > window.innerWidth){
            document.getElementsByClassName("game")[0].removeAttribute("style");
            //document.getElementsByClassName("game")[0].setAttribute("style", "height:"+window.innerWidth+"px;");
            document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerWidth+"px;");
        }
    });
    var game = new Game;
    game.initialize();
});
function Game() {
    // Variables
    var canvas,
        ctx,
        background,
        backgroundSpaceCape1,
        backgroundSpaceCape2,
        backgroundSaturn,
        scrollSpaceCape1 = 0,
        scrollSpaceCape2 = 0,
        scrollSaturn = -400,
        blackground,
        title,
        lapse,
        keyboard,
        startGame = false,
        timerToFlash = 0,
        lang = navigator.language,
        music,
        victoryMusic,
        bossMusic,
        writterSound,
        arrayWritterSound = new Array(),
        //History
        index = 0,
        historyText,
        historyTeller,
        yPosition = 40,
        timeLapse = 0,
        lineController = 0,
        startHistory = false,
        skipHistory = false,
        //SpaceShip
        spaceShip,
        score = 0,
        defaultSpaceShipWidth,
        defaultSpaceShipHeight,
        defaultSpaceShipBombWidth = 20,
        defaultSpaceShipBombHeight = 45, 
        arraySpaceShipShots,
        arraySpaceShipBombs,
        bossHitting= false,
        fireLapse = 0,
        //Enemies
        arrayEnemies,
        arrayEnemyShots,
        arrayDefeatedEnemies = new Array(),
        //FinalBoss         
        defaultBossShotWidth, 
        defaultBossShotHeight,  
        defaultBossSpecialShotWidth,
        defaultBossSpecialShotHeight,
        finalBossMoveSetArray = new Array(),
        finalBossMoveSpeedArray = new Array(),
        finalBossMoveSetControllerArray = new Array(),
        arrayFinalBossShots = new Array(),
        arrayFinalBossSpecialShots = new Array,
        smashing = false,
        smashCD = 0,
        totalLifes = 25,
        finalBossDefeated = false,
        finalBossApeared = false,
        arrayFinalBossExplosions = new Array(),
        playExplosion = true;
        
    // Mètodes públics
    this.initialize = function () {
        arrayEnemyShots = new Array;
        historyTeller = new Array;
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        backgroundInitialize();
        titleInitialize();
        spaceShipInitialize();
        addKeyboardEvents();
        enemiesInitialize();
        finalBossInitialize();

        victoryMusic = document.createElement('audio'); 
        victoryMusic.src="sound/metalSlugVictoryMusic.mp3"; 
        victoryMusic.volume = 0.05;
        bossMusic = document.createElement('audio');
        bossMusic.src = "sound/bossMusic.mp3"; 
        bossMusic.volume = 0.05;
        writterSound = document.createElement('audio'); 
        writterSound.src = "sound/writterSound.mp3"

        lapse = window.setInterval(frameLoop, 1000 / 60);
        window.onkeydown = function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            //console.log(key)
            if (key == 13) {
                startHistory = true;
            }
        }

        if(lang.startsWith("es") || lang.startsWith("ca")){
            historyText = ["El Enjambre Zerg es una amalgama aterradora y despiadada de elementos", 
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
        } else if(lang.startsWith("en")){
            historyText = ["The Zerg Swarm is a terrifying and ruthless amalgamation of biologically ", 
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
        } else if (lang.startsWith("ko")){
            historyText = ["Zerg Swarm은 생물학적으로 무서운 무자비한 합병이다. ", 
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
        
        
        for(var i = 0; i < historyText.length; i++){
            historyTeller.push("");
        }
                                //Move Set, Move Step
        finalBossMoveSetControllerArray = [0, 0]
        finalBossMoveSetArray = 
            [   //Up, Down, Left, Right
                [[0, 0,  800, 0], [0, 0, 0, 800]],
                [[0, canvas.height - finalBoss.y - finalBoss.height, 0, 0], [canvas.height - finalBoss.y - finalBoss.height, 0, 0, 0]],
                [[0, 270,  0, 0]],
                [[0, 800,  0, 0]]
                
            ];
        finalBossMoveSpeedArray = 
            [   //Up, Down, Left, Right
                [[0, 0, 3, 0], [0, 0, 0, 3]],
                [[0, 8, 0, 0], [3, 0, 0, 0]],
                [[0, 0.5, 0, 0]],
                [[0, 0.5, 0, 0]]
            ];
        finalBoss.y = -250;
    }

    // Main loopx
    function frameLoop() {
        drawBackground();
        if (startHistory && spaceShip.life > 0 && !finalBossDefeated) {
            if((!startGame || lineController < historyText.length) && !skipHistory){ //lineController < historyText.length
                drawHistory();

                if(!(lineController < historyText.length)){
                    window.onkeydown = function (e) {
                        var key = e.keyCode ? e.keyCode : e.which;
                        //console.log(key)
                        if (key == 13) {
                            startGame = true;
                        }
                    }
                } else {
                    window.onkeydown = function (e) {
                        var key = e.keyCode ? e.keyCode : e.which;
                        //console.log(key)
                        if (key == 27) {
                            skipHistory = true;
                            startGame = true;
                        }
                    }
                }
            } else if(startGame){
                drawSpaceShip();
                moveShots();     
                drawSpaceShipShots();
                drawSpaceShipBombs();
                drawEnemyShots();
                drawEnemies();
                drawEnemyExplosion();
                if (!checkEnemies()/* && finalBoss.life > 0*/){
                    music.pause();
                    drawFinalBoss();
                    moveFinalBoss();
                    if(finalBoss.life > 0){
                        finalBossApears();
                        finalBossFire();
                        drawFinalBossShots();
                        drawFinalBossSpecialShots();
                        finalBossSmash();
                        setFinalBossExplosions();
                    } else if (finalBoss.life <= 0){
                        arrayFinalBossShots = new Array();
                        arrayFinalBossSpecialShots = new Array();
                        finallBossExplosion();
                    }
                }/* else if(finalBoss.life <= 0){
                    drawFinalBoss(); 
                    finallBossExplosion();
                }*/ else {
                    music.play();
                }
                checkHit();
                checkEnemies();
                enemyFire();
                drawLifes();
                drawLeftBombs();
                drawScore();
    
                if (spaceShip.life > 0) {
                    moveSpaceShip();
                }
            }     
        } else if (!startGame){
            timerToFlash+= 10
            drawTitleScreen();
        } else if (startGame && spaceShip.life == 0){
            drawGameOver();
        } else if (startGame && spaceShip.life > 0 && finalBossDefeated){
            drawVictoryScreen();
        }
    }

    //#############################################################################
    //############################################################################# 
    //################################## CANVAS ###################################
    //#############################################################################
    //############################################################################# 
    function drawBackground() {
        if (scrollSpaceCape1 >= canvas.height) {
	        scrollSpaceCape1 = 0;
		}	
        scrollSpaceCape1 += 0.40; 
        
        if (scrollSpaceCape2 >= canvas.height) {
	        scrollSpaceCape2 = 0;
		}	
        scrollSpaceCape2 += 0.80; 

        if (scrollSaturn >= canvas.height) {
	        scrollSaturn = -600;
		}	
        scrollSaturn += 0.05; 

        ctx.drawImage(blackground, 0, 0);
		ctx.drawImage(backgroundSpaceCape1, 0, 0, canvas.width, canvas.height, 0, -canvas.height+scrollSpaceCape1, canvas.width, canvas.height);
        ctx.drawImage(backgroundSpaceCape1, 0, 0, canvas.width, canvas.height, 0, scrollSpaceCape1, canvas.width, canvas.height);
        
        ctx.drawImage(backgroundSpaceCape2, 0, 0, canvas.width, canvas.height, 0, -canvas.height+scrollSpaceCape2, canvas.width, canvas.height);
        ctx.drawImage(backgroundSpaceCape2, 0, 0, canvas.width, canvas.height, 0, scrollSpaceCape2, canvas.width, canvas.height);

       // ctx.drawImage(backgroundSaturn, 0, 0, canvas.width, canvas.height, 0, -canvas.height+scrollSaturn, canvas.width, canvas.height);
        ctx.drawImage(backgroundSaturn, 0, 0, canvas.width, canvas.height, 0, scrollSaturn, canvas.width, canvas.height);
        
        if(startGame && !checkEnemies()){
            scrollSpaceCape1 += 0.80;
            scrollSpaceCape2 += 1.4;
            scrollSaturn += 0.10;
        }
    }

    function backgroundInitialize() {
        blackground = new Image();
        blackground.src = "img/black.png";
        backgroundSaturn = new Image();
        backgroundSaturn.src = "img/saturn.png"
        backgroundSpaceCape1 = new Image();
        backgroundSpaceCape1.src = "img/space.png";
        backgroundSpaceCape2 = new Image();
        backgroundSpaceCape2.src = "img/spacecape2.png";

    } 

    function titleInitialize() {
        title = new Image();
        title.src = "img/gameTitle.png"; 
        music = document.createElement('audio'); 
        music.src="sound/music.mp3"; 
        music.volume = 0.05;
       
      
    }

    function drawTitleScreen() {
        if(timerToFlash > 500 && timerToFlash < 1000){
            ctx.font = "30px Arial";
            ctx.fillStyle ="Yellow";
            ctx.fillText("Press Enter To Play", (canvas.width / 2) - 125, 600);
           
        } else if ( timerToFlash > 1000){
            timerToFlash = 0;
        }
        ctx.drawImage(title, (canvas.width / 2) - 205, 0);
    }

    function drawGameOver(){
        var gameOver = new Image();
        gameOver.src = "img/gameOver2.png";
        ctx.drawImage(gameOver, 150, 200, 500, 250);
    }
    
    function drawVictoryScreen(){
        var gameOver = new Image();
        gameOver.src = "img/youWinOrange.png";
        ctx.drawImage(gameOver, 150, 200, 500, 250);
    }

    // Listener para el teclado
    function addKeyboardEvents() {
        keyboard = new Array();
        addEvent(document, "keydown", function (e) {
            keyboard[e.keyCode] = true;
        });
        addEvent(document, "keyup", function (e) {
            keyboard[e.keyCode] = false;
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

     // Controla el movimiento de los tiros de las naves
     function moveShots() {
        for (var i in arraySpaceShipShots) {
            var currentShot = arraySpaceShipShots[i];
            currentShot.y -= 20; //Shot speed
        }

        for (var i in arraySpaceShipBombs) {
            var currentBomb = arraySpaceShipBombs[i];
            currentBomb.y -= 5; //Shot speed
        }
        /*
        Aquesta funció de filter() serveix per esborrar elements de l'array quan han sobrepassat el canvas,
        és a dir, quan la coordenada y < 0
        */
        arraySpaceShipShots = arraySpaceShipShots.filter(function (shot) {
            return shot.y > 0;
        });

        //EnemiesShots
        for (var i in arrayEnemyShots) {
            var currentShot = arrayEnemyShots[i];
            currentShot.y += 2.5; // shot speed
        }
        arrayEnemyShots = arrayEnemyShots.filter(function (shot) {
            return shot.y > 0;
        });


        //FinalBoss Shots
        for (var i in arrayFinalBossShots) {
            var currentShot = arrayFinalBossShots[i];
            currentShot.y += 2.5; // shot speed
        }
        arrayFinalBossShots = arrayFinalBossShots.filter(function (shot) {
            return shot.y > 0;
        });
        
        var shotCounter = 0;
        for (var i in arrayFinalBossSpecialShots) {
            var currentShot = arrayFinalBossSpecialShots[i];
            /*shotCounter++;
            if(shotCounter == 0){
                currentShot.x -= 2.5;
                currentShot.y += 2.5;
            } else if (shotCounter == 1){
                currentShot.y += 2.5;
            } else if (shotCounter == 2){
                currentShot.x += 2.5;
                currentShot.y += 2.5;
                shotCounter=0;
            }*/
            if(currentShot.direction == "left"){
                currentShot.x -= 2.5;
                currentShot.y += 2.5;
            } else if (currentShot.direction == "center"){
                currentShot.y += 2.5;
            } else if (currentShot.direction == "right"){
                currentShot.x += 2.5;
                currentShot.y += 2.5;
            }
        }
        arrayFinalBossSpecialShots = arrayFinalBossSpecialShots.filter(function (shot) {
            return shot.y > 0;
        });
    }

    function drawScore(){
        ctx.font = "30px Arial";
        ctx.fillStyle ="White";
        ctx.fillText("Score : " + score, 600, 780);
    }

    // Comprobar las areas de colisiones
    function hit(a, b) {
        var hit = false;
        //Col·lisions horitzontals
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Col·lisions verticals
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }
        //Col·lisió de a amb b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }
        //Col·lisió de b amb a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }
        return hit;
    }

    //Comprobar las colisiones de las balas con las naves
    function checkHit() {
        // Comprobar los disparos de la nave aliada
        //Shots
        for (var i in arraySpaceShipShots) {
            var currentShot = arraySpaceShipShots[i];
            for (var j in arrayEnemies) {
                var current = arrayEnemies[j];
                if (hit(currentShot, current)) {
                    arrayDefeatedEnemies.push(current);
                    current.deadSound.play();
                    arrayEnemies.splice(arrayEnemies.indexOf(current), 1);
                    arraySpaceShipShots.splice(arraySpaceShipShots.indexOf(currentShot), 1);
                    score+=100;
                }
            }   

            if(finalBossApeared){  
                if (!checkEnemies() && finalBoss.life > 0) {
                    if (hit(currentShot, finalBoss)) {
                        finalBoss.life--;
                        arraySpaceShipShots.splice(arraySpaceShipShots.indexOf(currentShot), 1);
                    }
                }
            }
        }

        //Bombs
        for (var i in arraySpaceShipBombs) {
            var currentBomb = arraySpaceShipBombs[i];
            var lastEnemyDied = 0;
            for (var j in arrayEnemies) {
                var currentEnemy = arrayEnemies[j];
                if (hit(currentBomb, currentEnemy)) {
                    lastEnemyDied = currentEnemy.id;
                    if(currentBomb.numOfHits > 1){
                        score+= 110;
                        arrayDefeatedEnemies.push(currentEnemy);
                        currentEnemy.deadSound.play();
                        arrayEnemies.splice(arrayEnemies.indexOf(currentEnemy), 1);
                        currentBomb.numOfHits--;
                    } else{
                        arraySpaceShipBombs.splice(arraySpaceShipBombs.indexOf(currentBomb), 1);
                        arrayEnemies.forEach(function(enemy){
                            if(enemy.id == (lastEnemyDied + 1) || enemy.id == (lastEnemyDied - 10) || enemy.id == (lastEnemyDied - 1)){
                                arrayDefeatedEnemies.push(enemy);
                                enemy.deadSound.play();
                                arrayEnemies.splice(arrayEnemies.indexOf(enemy), 1);
                                score+=150;
                            } 
                        });
                        arrayDefeatedEnemies.push(currentEnemy)
                        currentEnemy.deadSound.play();
                        arrayEnemies.splice(arrayEnemies.indexOf(currentEnemy), 1);
                    }
                    
                }
            }

            if(finalBossApeared){                
                if (!checkEnemies() && finalBoss.life > 0) {
                    if (hit(currentBomb, finalBoss)) {
                        finalBoss.life-= 4;
                        arraySpaceShipBombs.splice(arraySpaceShipBombs.indexOf(currentBomb), 1);
                    }
                }
            }
        }

        // Comprobar colisiones de los disparos enemigos
        if (spaceShip.life > 0) {
            arrayEnemyShots.forEach(function (currentShot, i) {
                if (hit(currentShot, spaceShip)) {
                    spaceShip.life--;
                    arrayEnemyShots.splice(arrayEnemyShots.indexOf(currentShot), 1);
                }
            });
        }

        // FinalBossShots Collider
        if (spaceShip.life > 0) {
            arrayFinalBossShots.forEach(function (currentShot, i) {
                if (hit(currentShot, spaceShip)) {
                    arrayFinalBossShots.splice(arrayFinalBossShots.indexOf(currentShot), 1);
                    spaceShip.life--;
                }
            });
        }


        // FinalBossSpecialShots Collider
        if (spaceShip.life > 0) {
            arrayFinalBossSpecialShots.forEach(function (currentShot, i) {
                if (hit(currentShot, spaceShip)) {
                    spaceShip.life--;
                    arrayFinalBossSpecialShots.splice(arrayFinalBossSpecialShots.indexOf(currentShot), 1);
                }
            });
        }

        //Boss smash the SpaceShip
        if(hit(finalBoss, spaceShip) && !bossHitting && finalBoss.life > 0){
            spaceShip.life -= 2;
            bossHitting = true;
        } else if(!hit(finalBoss, spaceShip) && bossHitting){
            bossHitting = false;
        }
        
    }

    //#############################################################################
    //#############################################################################
    //################################## HISTORY ##################################
    //#############################################################################
    //#############################################################################
    function drawHistory() {
        if(lineController < historyText.length){
            if(timeLapse > 10){
                ctx.font = "20px Arial";
                ctx.fillStyle ="White";
                historyTeller[lineController] += (historyText[lineController].charAt(index));
                timeLapse = 0;
                index++;
            } else {
                timeLapse +=10
            }
            
            if(index == historyText[lineController].length){
                //yPosition+= 25;
                lineController++;
                index = 0;
            }
        }
        for(var j = 0; j < lineController+1; j++){
            if(historyTeller[j] != undefined){
                ctx.fillText(historyTeller[j], 40, ((j + 1) * 40));
            }
        }
        //ctx.fillText(historyTeller[lineController], 40, yPosition);
    }
    //#############################################################################
    //#############################################################################    
    //################################## SpaceShip ################################
    //#############################################################################
    //############################################################################# 

    // Inicializar la nave aliada
    function spaceShipInitialize() {
        defaultSpaceShipWidth = 72; //Ancho de la nave
        defaultSpaceShipHeight = 100; //Alto de la nave
        arraySpaceShipShots = new Array();
        arraySpaceShipBombs = new Array();
        spaceShip = {
            width: defaultSpaceShipWidth,
            height: defaultSpaceShipHeight,
            x: (canvas.width / 2) - (defaultSpaceShipWidth / 2),
            y: canvas.height - defaultSpaceShipHeight - 10,
            life: 5,
            bombs: 3,
            image: function () {
                var img = new Image();
                img.src = "img/pixelBattleCruiser.png";
                return img;
            },
            bombImage: function(){
                var img = new Image();
                img.src = "img/firebomb.png";
                return img;  
            }
        }
    }
    
     // Controles de la nave aliada
     function moveSpaceShip() {
        if (keyboard[37]) { // Left
            spaceShip.x -= 10;
            if (spaceShip.x <= 0) spaceShip.x = 0;
        }
        if (keyboard[38]) { // Up
            spaceShip.y -= 10;
            if (spaceShip.y <= (500 - spaceShip.height)) spaceShip.y = (500 - spaceShip.height);
        }
        if (keyboard[39]) { // Right
            spaceShip.x += 10;
            if (spaceShip.x >= (800 - spaceShip.width)) spaceShip.x = (800 - spaceShip.width);
        }
        if (keyboard[40]) { // Down
            spaceShip.y += 10;
            if (spaceShip.y >= (800 - spaceShip.height)) spaceShip.y = (800 - spaceShip.height);
        }
        /* NonStop Shot  */
        if (keyboard[32] && fireLapse > 100) {
            fireLapse = 0;
            fire();
        } else {
            fireLapse+= 5;
        }
         
        /*if (keyboard[32]) {
            if (!keyboard.fire) {
                fire();
                keyboard.fire = true;
            }
        } else {
            keyboard.fire = false;
        }*/

        if (keyboard[66]) {
            if (!keyboard.fireBomb) {
                fireBomb();
                keyboard.fireBomb = true;
            }
        } else {
            keyboard.fireBomb = false;
        }
    }

    // Clase tiro de la nave aliada
    function SpaceShipShot() {
        defaultSpaceShipShotWidth = 4;
        defaultSpaceShipShotHeight = 51;
        this.width = defaultSpaceShipShotWidth;
        this.height = defaultSpaceShipShotHeight;
        this.x = spaceShip.x + ((spaceShip.width / 2) - (defaultSpaceShipShotWidth / 2)); // volem que surti del centre
        this.y = spaceShip.y - 10;
        this.image = new Image();
        this.image.src = "img/battleCruiserShot.png";
        this.sound = document.createElement('audio'); 
        this.sound.src="sound/laserShort2.mp3";
        this.sound.volume = 0.05;
    }

    // Clase bomba de la nave aliada
    function SpaceShipBomb() {
        defaultSpaceShipBombWidth = 20;
        defaultSpaceShipBombHeight = 45;
        this.width = defaultSpaceShipBombWidth;
        this.height = defaultSpaceShipBombHeight;
        this.x = spaceShip.x + ((spaceShip.width / 2) - (defaultSpaceShipBombWidth / 2)); // volem que surti del centre
        this.y = spaceShip.y - 10;
        this.image = spaceShip.bombImage();
        this.numOfHits = 3;
        this.aoe = 1;
        this.sound = document.createElement('audio'); 
        this.sound.src="sound/laserLong.mp3";
        this.sound.volume = 0.8;
        //this.image.src = "img/spit.png";
    }

    function drawSpaceShip() {
        if (spaceShip.life <= 0)
            return;
        ctx.drawImage(spaceShip.image(), spaceShip.x, spaceShip.y, defaultSpaceShipWidth, defaultSpaceShipHeight);
    }

    function drawSpaceShipShots() {
        for (var i in arraySpaceShipShots) {
            var currentShot = arraySpaceShipShots[i];
            ctx.drawImage(currentShot.image, currentShot.x, currentShot.y, defaultSpaceShipShotWidth, defaultSpaceShipShotHeight);
        }
    }

    function drawSpaceShipBombs() {
        for (var i in arraySpaceShipBombs) {
            var currentBomb = arraySpaceShipBombs[i];
            ctx.drawImage(currentBomb.image, currentBomb.x, currentBomb.y, defaultSpaceShipBombWidth, defaultSpaceShipBombHeight);
        }
    }

    // Añade un disparo al array de disparos de la nave aliada
    function fire() {
        var currentShot = new SpaceShipShot();
        arraySpaceShipShots.push(currentShot);
        currentShot.sound.play();
    }

    // Añade un disparo al array de disparos de la nave aliada
    function fireBomb() {
        if(spaceShip.bombs > 0){
            var currentBomb = new SpaceShipBomb();
            arraySpaceShipBombs.push(currentBomb);
            currentBomb.sound.play(); 
            spaceShip.bombs--;
        }
        
    }

    //Mostrar vidas restantes
    function drawLifes() {
        for (var i = 0; i < spaceShip.life; i++) {
            ctx.drawImage(spaceShip.image(), 20 + (i * 40), 650, 30, 45); // X, Y, width, height
        }
    }

    function drawLeftBombs() {
        for (var i = 0; i < spaceShip.bombs; i++) {
            ctx.drawImage(spaceShip.bombImage(), 20 + (i * 40), 710, defaultSpaceShipBombWidth, defaultSpaceShipBombHeight); // X, Y, width, height
        }
    }


    //#############################################################################
    //############################################################################# 
    //################################## Enemies ################################## 
    //#############################################################################
    //#############################################################################   

     // "Clase" Enemigo
     function Enemy() {
        defaultWidth = 72;
        defaultHeight = 50;
        this.width = defaultWidth;
        this.height = defaultHeight;
        this.x = 0;
        this.y = 10;
        this.image = new Image();
        this.image.src = "img/mutalisk.png";
        this.id = 0;
        this.explosionLapse = 0;
        this.enemyExplosionStep1 = new Image()
        this.enemyExplosionStep1.src = "img/explosionStep1.png"
        this.enemyExplosionStep2 = new Image()
        this.enemyExplosionStep2.src = "img/explosionStep2.png"
        this.enemyExplosionStep3 = new Image()
        this.enemyExplosionStep3.src = "img/explosionStep3.png"
        this.deadSound = document.createElement('audio'); 
        this.deadSound.src="sound/pixelExplosionShort.mp3";
        this.deadSound.volume = 0.04;
    }

    // Rellenar array de enemigos
    function enemiesInitialize() {
        arrayEnemies = new Array();
        var InLine = 0;
        var lineCounter = 0;
        for (var i = 0; i < 1; i++) {
            var current = new Enemy();
            current.id = i + 1;
            if (InLine > 9) {
                InLine = 0;
                lineCounter += 79;
            }
            current.x = 10 + (InLine * 79);
            current.y = lineCounter;
            InLine++;
            arrayEnemies.push(current);
        }
    }

    // Recorre y dibuja todos los enemigos del array de enemigo
    function drawEnemies() {
        arrayEnemies.forEach(function (currentEnemy, i) {
            ctx.drawImage(currentEnemy.image, currentEnemy.x, currentEnemy.y, 79, 79);
        });
    }


    function drawEnemyShots() {
        for (var i in arrayEnemyShots) {
            var currentEnemyShot = arrayEnemyShots[i];
            ctx.drawImage(currentEnemyShot.image, currentEnemyShot.x, currentEnemyShot.y, defaultEnemyShotWidth, defaultEnemyShotHeight);
        };
    }

    //Clase Tiro de los enemigos
    function EnemyShot(enemy) {
        defaultEnemyShotWidth = 20;
        defaultEnemyShotHeight = 33;
        this.width = defaultEnemyShotWidth;
        this.height = defaultEnemyShotHeight;
        this.x = enemy.x + ((enemy.width / 2) - (defaultEnemyShotWidth / 2)); // volem que surti del centre
        this.y = enemy.y + 30;
        this.image = new Image();
        this.image.src = "img/spit2.png";
        this.sound = document.createElement('audio'); 
        this.sound.src="sound/zergShot2.mp3";
        this.sound.volume = 0.1;
    }

    //Tiros de los enemigos y boss
    function enemyFire() {
        if (checkEnemies()) {
            arrayEnemies.forEach(function (currentEnemy, i) {
                // Això és la IA dels enemics
                if (Math.floor(Math.random() * 2000) == 0) {
                    var currentShot = new EnemyShot(currentEnemy);
                    currentShot.sound.play();
                    arrayEnemyShots.push(currentShot);
                }
            });
        }
        else {
            
        }
    }

    //Comprobar si aún hay enemigos vivos
    function checkEnemies() {
        if (arrayEnemies.length <= 0)
            return false;
        return true;
    }


    function drawEnemyExplosion(){
        for (var i in arrayDefeatedEnemies) {
            var current = arrayDefeatedEnemies[i];
            current.explosionLapse+=3.5;

            if(current.explosionLapse > 10 && current.explosionLapse < 30){
                ctx.drawImage(current.enemyExplosionStep1, current.x + (current.width / 2) - (current.enemyExplosionStep1.width / 2), current.y + (current.height / 2) - (current.enemyExplosionStep1.height / 2));
            } else if (current.explosionLapse >= 29 && current.explosionLapse < 60){
                ctx.drawImage(current.enemyExplosionStep2, current.x + (current.width / 2) - (current.enemyExplosionStep2.width / 2), current.y + (current.height / 2) - (current.enemyExplosionStep2.height / 2))
            } else if (current.explosionLapse >= 59 && current.explosionLapse < 89){
                ctx.drawImage(current.enemyExplosionStep3, current.x + (current.width / 2) - (current.enemyExplosionStep3.width / 2), current.y + (current.height / 2) - (current.enemyExplosionStep3.height / 2))
            } else if (current.explosionLapse >= 90 && current.explosionLapse < 119){
                ctx.drawImage(current.enemyExplosionStep2, current.x + (current.width / 2) - (current.enemyExplosionStep2.width / 2), current.y + (current.height / 2) - (current.enemyExplosionStep2.height / 2))
            } else if (current.explosionLapse >= 120){
                ctx.drawImage(current.enemyExplosionStep1, current.x + (current.width / 2) - (current.enemyExplosionStep1.width / 2), current.y + (current.height / 2) - (current.enemyExplosionStep1.height / 2))
                arrayDefeatedEnemies.splice(arrayDefeatedEnemies.indexOf(current), 1);
            }
        }
        
    }


    //###############################################################################
    //############################################################################### 
    //################################## FinalBoss ##################################
    //###############################################################################
    //###############################################################################  

    //Inicializador del boss final
    function finalBossInitialize() {
        defaultFinalBossWidth = 300;//500
        defaultFinalBossHeight = 200;//325
        finalBoss = {
            width: defaultFinalBossWidth,
            height: defaultFinalBossHeight,
            x: (canvas.width / 2) - (defaultFinalBossWidth / 2),
            y: 1,
            //y: -250,
            life: totalLifes, //totalLifes
            image100: function () {
                var img = new Image();
                img.src = "img/zergBoss.png";
                return img;
            },
            image75: function () {
                var img = new Image();
                img.src = "img/zergBoss75.png";
                return img;
            },
            image50: function () {
                var img = new Image();
                img.src = "img/zergBoss50.png";
                return img;
            },
            image25: function () {
                var img = new Image();
                img.src = "img/zergBoss25.png";
                return img;
            },
            image0: function () {
                var img = new Image();
                img.src = "img/zergBoss0.png";
                return img;
            },
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            enemyExplosionStep1: function () {
                var img = new Image();
                img.src = "img/explosionStep1.png";
                return img;
            },
            enemyExplosionStep2: function () {
                var img = new Image();
                img.src = "img/explosionStep2.png";
                return img;
            },
            enemyExplosionStep3: function () {
                var img = new Image();
                img.src = "img/explosionStep3.png";
                return img;
            },
            explosionLapse: 0,
            deadSound: function(){
                var deadSound = document.createElement('audio');
                deadSound.src="sound/pixelExplosionShort.mp3";
                deadSound.volume = 0.01;
                deadSound.onended = function(){playExplosion = true;}
                return deadSound;
            }
        }
    }

    function drawFinalBossShots() {
        for (var i in arrayEnemyShots) {
            var currentEnemyShot = arrayEnemyShots[i];
            ctx.drawImage(currentEnemyShot.image, currentEnemyShot.x, currentEnemyShot.y, defaultEnemyShotWidth, defaultEnemyShotHeight);
        };
    }

    function drawFinalBoss() {
        /*if (finalBoss.life <= 0){
            return;
        }*/
        if(calcFinalBossPercentage() > 75){
            ctx.drawImage(finalBoss.image100(), finalBoss.x, finalBoss.y, defaultFinalBossWidth, defaultFinalBossHeight)
        } else if (calcFinalBossPercentage() < 75 && calcFinalBossPercentage() > 50){
            ctx.drawImage(finalBoss.image75(), finalBoss.x, finalBoss.y, defaultFinalBossWidth, defaultFinalBossHeight)
        } else if (calcFinalBossPercentage() < 50 && calcFinalBossPercentage() > 25){
            ctx.drawImage(finalBoss.image50(), finalBoss.x, finalBoss.y, defaultFinalBossWidth, defaultFinalBossHeight)
        } else if (calcFinalBossPercentage() < 25 && calcFinalBossPercentage() > 0){
            ctx.drawImage(finalBoss.image25(), finalBoss.x, finalBoss.y, defaultFinalBossWidth, defaultFinalBossHeight)
        } else if (calcFinalBossPercentage() <= 0){
            ctx.drawImage(finalBoss.image0(), finalBoss.x, finalBoss.y, defaultFinalBossWidth, defaultFinalBossHeight)
            finalBossMoveSetControllerArray[0] = 3;
            finalBossMoveSetControllerArray[1] = 0;
            bossMusic.pause();
        }
        
    }

    function calcFinalBossPercentage(){
        return (finalBoss.life * 100) / totalLifes;
    }

    function moveFinalBoss(){
   
        var totalMoveStepValue = finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][0] + finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][1] + 
                                 finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][2] + finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][3];
        reacherValue = finalBoss.up + finalBoss.down +finalBoss.left + finalBoss.right;
        //console.log("reach " + reacherValue + "  " + totalMoveStepValue);
        /*if( finalBossMoveSetArray[0][finalBossMoveSetControllerArray[1]][0] >= finalBoss.up && 
            finalBossMoveSetArray[0][finalBossMoveSetControllerArray[1]][1] >= finalBoss.down && 
            finalBossMoveSetArray[0][finalBossMoveSetControllerArray[1]][2] >= finalBoss.left && 
            finalBossMoveSetArray[0][finalBossMoveSetControllerArray[1]][3] >= finalBoss.right){*/
        if(reacherValue < totalMoveStepValue){
            if(finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][0] >= finalBoss.up){
                finalBoss.y -= finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][0];
                finalBoss.up += finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][0];
            }

            if(finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][1] >= finalBoss.down){
                finalBoss.y += finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][1];
                finalBoss.down += finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][1];
            }

            if(finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][2] >= finalBoss.left && finalBoss.x > 0){
                finalBoss.x -= finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][2];
                finalBoss.left += finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][2];
            } else {
                finalBoss.left = finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][2];
                //console.log(totalMoveStepValue == reacherValue);
                //console.log(totalMoveStepValue + "     m    " + reacherValue + "  l   " +  finalBoss.left + "  h  " + finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][2])
            }

            if(finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][3] >= finalBoss.right && finalBoss.x + finalBoss.width < 800){
                finalBoss.x += finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][3];
                finalBoss.right += finalBossMoveSpeedArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][3];
            }  else {
                finalBoss.right = finalBossMoveSetArray[finalBossMoveSetControllerArray[0]][finalBossMoveSetControllerArray[1]][3];
            }
        } else {           
            finalBoss.up = 0;
            finalBoss.down = 0;
            finalBoss.left = 0;
            finalBoss.right = 0;
            reacherValue = 0;
            //console.log(finalBossMoveSetControllerArray[1] < (finalBossMoveSetArray[finalBossMoveSetControllerArray[0]].length - 1))
            if(finalBossMoveSetControllerArray[1] < (finalBossMoveSetArray[finalBossMoveSetControllerArray[0]].length - 1)){
                finalBossMoveSetControllerArray[1] += 1;
            } else {
                if(finalBossMoveSetControllerArray[0] == 1){
                    //console.log("endStep")
                    smashing = false;
                    
                } else if(finalBossMoveSetControllerArray[0] == 2){
                    finalBoss.y = 20;
                    finalBossApeared = true;
                    bossMusic.play();
                } else if(finalBossMoveSetControllerArray[0] == 3){
                    finalBossDefeated = true;
                    victoryMusic.play();
                }

                finalBossMoveSetControllerArray[1] = 0;
            }
        }
    }

    function finalBossApears(){
        if(!finalBossApeared){
            finalBossMoveSetControllerArray[0] = 2;
            finalBossMoveSetControllerArray[1] = 0;
        } 
    }

    function setFinalBossExplosions(){
        arrayFinalBossExplosions = 
        [   //Time to start, counterToStart, lapse, x, y
            [30, 0, 0, 100, 60],
            [60, 0, 0, 20, 20],
            [120, 0, 0, 180, 20],
            [170, 0, 0, 170, 120],
            [200, 0, 0, 70, 130],
        ]
    }

    function finallBossExplosion(){ 
        //finalBoss.explosionLapse+=3.5;
        /*if(finalBoss.explosionLapse > 10 && finalBoss.explosionLapse < 30){
            ctx.drawImage(finalBoss.enemyExplosionStep1(), finalBoss.x + (finalBoss.width / 2) - (finalBoss.enemyExplosionStep1().width / 2), finalBoss.y + (finalBoss.height / 2) - (finalBoss.enemyExplosionStep1().height / 2));
        } else if (finalBoss.explosionLapse >= 29 && finalBoss.explosionLapse < 60){
            ctx.drawImage(finalBoss.enemyExplosionStep2(), finalBoss.x + (finalBoss.width / 2) - (finalBoss.enemyExplosionStep2().width / 2), finalBoss.y + (finalBoss.height / 2) - (finalBoss.enemyExplosionStep2().height / 2))
        } else if (finalBoss.explosionLapse >= 59 && finalBoss.explosionLapse < 90){
            ctx.drawImage(finalBoss.enemyExplosionStep3(), finalBoss.x + (finalBoss.width / 2) - (finalBoss.enemyExplosionStep3().width / 2), finalBoss.y + (finalBoss.height / 2) - (finalBoss.enemyExplosionStep3().height / 2))
        } else if (finalBoss.explosionLapse >= 89 && finalBoss.explosionLapse < 120){
            ctx.drawImage(finalBoss.enemyExplosionStep2(), finalBoss.x + (finalBoss.width / 2) - (finalBoss.enemyExplosionStep2().width / 2), finalBoss.y + (finalBoss.height / 2) - (finalBoss.enemyExplosionStep2().height / 2))
        } else if (finalBoss.explosionLapse >= 119 && finalBoss.explosionLapse < 150){
            ctx.drawImage(finalBoss.enemyExplosionStep1(), finalBoss.x + (finalBoss.width / 2) - (finalBoss.enemyExplosionStep1().width / 2), finalBoss.y + (finalBoss.height / 2) - (finalBoss.enemyExplosionStep1().height / 2))
            finalBoss.explosionLapse = 0;   
        } */

        for (var i in arrayFinalBossExplosions) {
            if(arrayFinalBossExplosions[i][1] >= arrayFinalBossExplosions[i][0]){
                arrayFinalBossExplosions[i][2]+=3.5
                if( arrayFinalBossExplosions[i][2] > 10 &&  arrayFinalBossExplosions[i][2] < 30){
                    if(i == 2 && playExplosion){
                        finalBoss.deadSound().play();
                        playExplosion = false;
                    }
                    ctx.drawImage(finalBoss.enemyExplosionStep1(), finalBoss.x + arrayFinalBossExplosions[i][3], finalBoss.y + arrayFinalBossExplosions[i][4]);
                } else if ( arrayFinalBossExplosions[i][2] >= 29 &&  arrayFinalBossExplosions[i][2] < 60){
                    ctx.drawImage(finalBoss.enemyExplosionStep2(), finalBoss.x + arrayFinalBossExplosions[i][3], finalBoss.y + arrayFinalBossExplosions[i][4])
                } else if ( arrayFinalBossExplosions[i][2] >= 59 &&  arrayFinalBossExplosions[i][2] < 90){
                    ctx.drawImage(finalBoss.enemyExplosionStep3(), finalBoss.x + arrayFinalBossExplosions[i][3], finalBoss.y + arrayFinalBossExplosions[i][4])
                } else if ( arrayFinalBossExplosions[i][2] >= 89 &&  arrayFinalBossExplosions[i][2] < 120){
                    ctx.drawImage(finalBoss.enemyExplosionStep2(), finalBoss.x + arrayFinalBossExplosions[i][3], finalBoss.y + arrayFinalBossExplosions[i][4])
                } else if ( arrayFinalBossExplosions[i][2] >= 119 &&  arrayFinalBossExplosions[i][2] < 150){
                    ctx.drawImage(finalBoss.enemyExplosionStep1(), finalBoss.x + arrayFinalBossExplosions[i][3], finalBoss.y + arrayFinalBossExplosions[i][4])
                    arrayFinalBossExplosions[i][2] = 0;
                    arrayFinalBossExplosions[i][1] = 0;
                }
            } else {
                arrayFinalBossExplosions[i][1]+=3.5
            }
        }
        
    }

    function finalBossSmash() {
        if((finalBoss.x < spaceShip.x && spaceShip.x < finalBoss.x + finalBoss.width - 20) && !smashing && smashCD > 200){ //&& spaceShip.x < finalBoss.x + finalBoss.width
            smashing = true;
            finalBoss.up = 0;
            finalBoss.down = 0;
            finalBoss.left = 0;
            finalBoss.right = 0;
            reacherValue = 0;
            finalBossMoveSetControllerArray[0] = 1;
            finalBossMoveSetControllerArray[1] = 0;
            smashCD = 0;
        } else if(!smashing && finalBossApeared){  
            finalBossMoveSetControllerArray[0] = 0;
            //finalBossMoveSetControllerArray[1] = 0;
            smashing = false;
            smashCD+=1;
        }

       
        //console.log(smashCD);
    }

    function finalBossFire(){
        if(!smashing && finalBossApeared){
            if (finalBoss.life <= 0)
                return;
            // IA del Final Boss
            if (Math.floor(Math.random() * 30) == 0) {
                var currentShot = new FinalBossShot(finalBoss);
                arrayFinalBossShots.push(currentShot);
            }

            if (Math.floor(Math.random() * 60) == 0) {
                var currentShot = new FinalBossSpecialShot(finalBoss);
                var currentShot2 = new FinalBossSpecialShot(finalBoss);
                var currentShot3 = new FinalBossSpecialShot(finalBoss);
                //var littleArray = [[currentShot], [currentShot2], [currentShot3]];
                currentShot.direction = "left";
                currentShot2.direction = "center";
                currentShot3.direction = "right";
                arrayFinalBossSpecialShots.push(currentShot, currentShot2, currentShot3);
            }
        }  
    }

    //Clase Tiro de los enemigos
    function FinalBossShot(boss) {
        defaultBossShotWidth = 25; // declarar
        defaultBossShotHeight = 36; // decalrar
        this.width = defaultBossShotWidth;
        this.height = defaultBossShotHeight;
        this.x = boss.x + ((boss.width / 2) - (defaultBossShotWidth / 2)); // volem que surti del centre
        this.y = boss.height - 20;
        this.image = new Image();
        this.image.src = "img/spit2.png";
    }

    //Clase Tiro de los enemigos
    function FinalBossSpecialShot(boss) {
        defaultBossSpecialShotWidth = 20;
        defaultBossSpecialShotHeight = 33;
        this.width = defaultBossShotWidth;
        this.height = defaultBossSpecialShotHeight;
        this.x = boss.x + ((boss.width / 2) - (defaultBossShotWidth / 2)); // volem que surti del centre
        this.y = boss.height - 20;
        this.image = new Image();
        this.image.src = "img/spit245.png",
        this.direction;
    }  

    function drawFinalBossShots() {
        for (var i in arrayFinalBossShots) {
            var currentFinalBossShot = arrayFinalBossShots[i];
            ctx.drawImage(currentFinalBossShot.image, currentFinalBossShot.x, currentFinalBossShot.y, defaultBossShotWidth, defaultBossShotHeight);
        };
    }
    
    function drawFinalBossSpecialShots() {
        for (var i in arrayFinalBossSpecialShots) {
            var currentFinalBossSpecialShot= arrayFinalBossSpecialShots[i];
            ctx.drawImage(currentFinalBossSpecialShot.image, currentFinalBossSpecialShot.x, currentFinalBossSpecialShot.y, defaultBossSpecialShotWidth, defaultBossSpecialShotWidth);  
        };
    }
}