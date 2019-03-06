
window.addEventListener("load", function () {
    if(document.getElementsByClassName("game")[0].clientHeight > window.innerHeight){
        document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
        
    } else if(document.getElementsByClassName("game")[0].clientHeight <= window.innerHeight){
        document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
    }

    if(document.getElementsByClassName("game")[0].clientWidth > window.innerWidth){
        document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerWidth+"px;");
    }
    
    window.addEventListener("resize", function(){
        if(document.getElementsByClassName("game")[0].clientHeight > window.innerHeight){
            document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
            
        } else if(document.getElementsByClassName("game")[0].clientHeight <= window.innerHeight){
            document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerHeight+"px;");
        }

        if(document.getElementsByClassName("game")[0].clientWidth > window.innerWidth){
            document.getElementsByClassName("game")[0].removeAttribute("style");
            document.getElementsByClassName("game")[0].setAttribute("style", "width:"+window.innerWidth+"px;");
        }
    });
});

/** 
* Aquesta funció carrega els scripts js, que en realitat són les classes, que necessitaré.
* Quan un script s'ha carregat (de forma asíncrona) intenta executar la funció init().
* Aquesta només iniciarà el joc quan tots els scripts estiguin carregats.
*/
function loadScripts(urls, callback)
{
	let scriptsLoaded = 0;
	
	for (var i =  0; i < urls.length; i++) 
	{
	    var script = document.createElement("script");
	    script.type = "text/javascript";

	    if (script.readyState){  //IE
	        script.onreadystatechange = function(){
	            if (script.readyState == "loaded" ||
	                    script.readyState == "complete"){
	                script.onreadystatechange = null;
					scriptsLoaded++;
					if (scriptsLoaded == urls.length)
						callback();
	            }
	        };
	    } else {  //Others
	        script.onload = function(){
	            scriptsLoaded++;
				if (scriptsLoaded == urls.length)
					callback();
	        };
	    }
	    script.src = urls[i];
	    document.getElementsByTagName("head")[0].appendChild(script);
	}
}

/**
* Quan s'hagin carregat tots els scripts necessaris pel correcte funcionament del joc ja es pot instanciar
* un objecte 'game' i inicialitzar-lo, és a dir, començar a jugar!
* Els paràmetres que passo al mètode initialize() són les mides actual de la finestra (navegador). En la descripció
* del mètode s'explica com s'opera amb aquests paràmetres.
*/
function init(length)
{
	var game = new Game();
	game.initialize(window.innerWidth,window.innerHeight);
}

/**
* Quan la pàgina està preparada s'executa aquesta funció per carregar tots els scripts.
* En aquest cas cada script correspon a una classe: Game, Player, Scenario, etc.
*/
window.addEventListener("load", function() {
	var jsClasses = ["js/Game.js", "js/SpaceShip.js", "js/Scenario.js"]; 	
	loadScripts(jsClasses, function() {init(jsClasses.length);});
});