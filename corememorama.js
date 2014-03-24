 /*
 * @author: Oscar Adrian Gonzalez Gamboa
 * @contact: r_edward1@hotmail.com
 * Last Update: 23.03.2014
 */

var playing = false;
var numpers = 0;
var timercount = 0;
var timestart  = null;
var clickedcards = new Array();
var memorama = new Array();
memorama[1] = "imagenes/antena.png";
memorama[2] = "imagenes/chip.png";
memorama[3] = "imagenes/cohete.png";
memorama[4] = "imagenes/computadora.png";
memorama[5] = "imagenes/estrella.png";
memorama[6] = "imagenes/luna.png";
memorama[7] = "imagenes/power.png";
memorama[8] = "imagenes/quimica.png";
memorama[9] = "imagenes/saturno.png";
memorama[10] = "imagenes/sync.png";
        
function initialize () {
	
	reset();
	distributioncard();
}
        
function flipcard (obj) {
	
	if (playing == false) return;
	
	var idcarta = obj.name;
	
	if (obj.src.indexOf("imagenes/diamante.png") >= 0) {
		
		obj.src = memorama[idcarta]; 
		clickedcards.push(obj);
		
		if (clickedcards.length == 2) {
	
		  var firstobj = clickedcards[0];
		  var secondobj = clickedcards[1];
		  
		  if (firstobj.name != secondobj.name) {
		  
			setTimeout(function(){
				
			  firstobj.src = "imagenes/diamante.png"
			  secondobj.src = "imagenes/diamante.png"
			  
			},300);
			
		  }else{
			  
			  numpers++;
		  }
		  
		  clickedcards.length = 0;
		  
		  if (numpers == 10) {
			  
			 gameover(); 
		  }
		  
		}
		
	}
	
}
        
function distributioncard () {
	
	var i = 1;
	var limit = 10;
	var x = 1;
	var distarray = [];
	
	while (x<11) {
		distarray.push(x);
		x++;
	}
		  
	for (var a = 0; a < 2; a++) {
	  
	  var control = 0;
	  var shufflearray = shuffle(distarray);
	  
	  for ( i; i <= limit; i++) {
	  
		var tmpcard = document.getElementById(i);
		tmpcard.name = shufflearray[(control)];
		control++;
	  }
	  
	  limit = limit + 10;
   
	}

}
        
function startgame () {
	
	playing = true;
	document.getElementById("btnplay").disabled = true;
	
	sw_start();
}
        
function gameover () {

	playing = false;
	stop();
	
	var time = document.timeform.timetextarea.value;
	alert ("Your time: " + time);
}

function randomXToY (minVal,maxVal,floatVal) {
	
	var randVal = minVal+(Math.random()*(maxVal-minVal));
	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

function shuffle (array) {
	
	var j, temp;
	
	for(var i = array.length - 1; i > 0; i--) {
		
	  j = Math.floor(Math.random() * (i + 1));
	  temp = array[i];
	  array[i] = array[j];
	  array[j] = temp;
	  
	}
	
	return array;
}

function sw_start() {
	
  if(!timercount){
	  
	timestart   = new Date();
	document.timeform.timetextarea.value = "00:00:00";
	timercount  = setTimeout("showtimer()", 1000);
	
  }
  
}
       
function showtimer() {
	
  if(timercount) {
	  
	clearTimeout(timercount);
	clockID = 0;
	
  }
  
  if(!timestart){
	  
	timestart = new Date();
  }
  
  var timeend = new Date();
  var timedifference = timeend.getTime() - timestart.getTime();
  timeend.setTime(timedifference);
  
  var hours_passed = timeend.getUTCHours();
  
  if(hours_passed < 10){
	  
	hours_passed = "0" + hours_passed;
  }
  
  var minutes_passed = timeend.getMinutes();
  
  if(minutes_passed < 10){
	  
	minutes_passed = "0" + minutes_passed;
  }
  
  var seconds_passed = timeend.getSeconds();
  
  if(seconds_passed < 10){
	  
	seconds_passed = "0" + seconds_passed;
  }
  
  document.timeform.timetextarea.value = hours_passed + ":"+ minutes_passed + ":" + seconds_passed;
  timercount = setTimeout("showtimer()", 1000);
  
}
                
function stop() {
	
  if(timercount) {
	  
	clearTimeout(timercount);
	timercount  = 0;
	var timeend = new Date();
	var timedifference = timeend.getTime() - timestart.getTime();
	timeend.setTime(timedifference);
	
	var hours_passed = timeend.getUTCHours();
	
	if(hours_passed < 10){
	  hours_passed = "0" + hours_passed;
	}
	
	var minutes_passed = timeend.getMinutes();
	
	if(minutes_passed < 10){
	  minutes_passed = "0" + minutes_passed;
	}
	
	var seconds_passed = timeend.getSeconds();
	
	if(seconds_passed < 10){
	  seconds_passed = "0" + seconds_passed;
	}
	
	document.timeform.timetextarea.value = hours_passed + ":" + minutes_passed + ":" + seconds_passed;
	
  }
  
   timestart = null;
  
}

function reset() {
	
  timestart = null;
  document.getElementById("btnplay").disabled = false;
  document.timeform.timetextarea.value = "00:00:00";
  
}