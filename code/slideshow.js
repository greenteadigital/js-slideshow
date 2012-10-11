var prefix = [  /* DO NOT  ADD ANY UNCOMMENTED CODE ABOVE THIS LINE!  It will break the Python minify script */
'chapter',
'ski-trip',
'recital',
'ash-wednesday',
'jacks-class',
'book-banter',
'crossings',
'confirmation',
'womens-summer-reading-group',
'mission-brunch',
'couples-bible-study',
'mens-bible',
'centering-prayer'
]
var x = '.jpg' 
var hiRes = './images/hi-res/'
var link =[]
for (n=0; n < prefix.length; n++) {link[n] = hiRes + prefix[n] + x;}

function replaceLink(index, address) { link[index] = address }
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------

var Opacity = 0;
var show1;							// Make these three global...
var hide1, hide2;					//...to be modified later
var runFade = true;
var fadeDelay = 15;		// in milliseconds. Passed to setInterval(), bigger # == slower fade
var step = 2;			// used as percent increase or decrease in opacity; 100%step MUST equal 0
var rootDir = './images/';
var digit;				// from document.cookie, indicates position of last slide viewed in prefix array
var imgNum;
var cookieCrumbs = '';
var preloadCounter = 0;

/*
function print(message) {
	document.getElementById("diag").innerHTML = message;
}
*/

function resetCookie() {		// reset cookie to zero
	document.cookie = "currentSlide="+0+"";
	return;
}
function crushCookie() {		// yields imgNum, that's all
	if (document.cookie.indexOf("currentSlide") > -1) {
		//alert(document.cookie);
		cookieCrumbs = document.cookie.split(";");
		for (i=0; i<cookieCrumbs.length; i++){
			if (cookieCrumbs[i].indexOf("currentSlide") > -1){
				digit = cookieCrumbs[i].split("=");
				//alert(digit);
				imgNum = parseInt(digit[1]);
			}
		}
	}
	return;
}
function loadBottom() {	//called by selectiveLoad()
	for (i=2;i<prefix.length;i++) {
		document.getElementById('p'+i).src = './images/'+prefix[i]+'.jpg';
	}
}
function loadArbitrary() {	//called by selectiveLoad()
	if (imgNum <= prefix.length - 4) {
		for (i=imgNum+3;i<prefix.length;i++) {
			document.getElementById('p'+i).src = './images/'+prefix[i]+'.jpg';
		}
		for (n=0;n<=imgNum;n++){
			document.getElementById('p'+n).src = './images/'+prefix[n]+'.jpg';
		}
	}
	if (imgNum == prefix.length - 3) {
		for (n=0;n<=imgNum;n++) {
			document.getElementById('p'+n).src = './images/'+prefix[n]+'.jpg';
		}
	}
	if (imgNum == prefix.length - 2) {
		for (n=1;n<=imgNum;n++) {
			document.getElementById('p'+n).src = './images/'+prefix[n]+'.jpg';
		}
	}
	if (imgNum == prefix.length - 1) {
		for (n=2;n<=imgNum;n++) {
			document.getElementById('p'+n).src = './images/'+prefix[n]+'.jpg';
		}
	}
}
function selectiveLoad() {
	if (document.cookie.indexOf("currentSlide") > -1) {
		loadArbitrary();
	}
	if (document.cookie.indexOf("currentSlide") == -1) {
		loadBottom();
	}
}
function preload() {	
	if (document.cookie.indexOf("currentSlide") == -1) {
		document.getElementById('p0').src = './images/'+prefix[0]+'.jpg';
		document.getElementById('p1').src = './images/'+prefix[1]+'.jpg';
	}
	if (document.cookie.indexOf("currentSlide") > -1) {
		//alert(document.cookie);
		crushCookie();
		if (imgNum <= prefix.length - 3) {
			document.getElementById('p'+(imgNum+1)+'').src = './images/'+prefix[(imgNum+1)]+'.jpg';
			document.getElementById('p'+(imgNum+2)+'').src = './images/'+prefix[(imgNum+2)]+'.jpg';
		}
		if (imgNum == prefix.length - 2) {
			document.getElementById('p'+(imgNum+1)+'').src = './images/'+prefix[(imgNum+1)]+'.jpg';
			document.getElementById('p0').src = './images/'+prefix[0]+'.jpg';
		}
		if (imgNum == prefix.length - 1) {
			document.getElementById('p0').src = './images/'+prefix[0]+'.jpg';
			document.getElementById('p1').src = './images/'+prefix[1]+'.jpg';
		}
	}
}
function bumpCookie() {		// increase cookie by one
	crushCookie();
	document.cookie = "currentSlide="+(imgNum+1)+"";
	return;
}
function setImgOpacity() {
	// 3 separate styles to change for multi-browser compatibility
	document.getElementById("slide-pane").style.mozOpacity = Opacity/100;
	document.getElementById("slide-pane").style.filter= 'alpha(opacity=' + Opacity +')';
	document.getElementById("slide-pane").style.opacity = Opacity/100;
	return;
}
function clearTimers() {
	clearInterval(show1);
	clearInterval(hide1);
	clearInterval(hide2);
	return;
}
function fadeIn() {		// Increments opacity value by step per iteration, used with setInterval()
	if (Opacity < 100 && runFade == true) {	//default conditions at runtime
		Opacity += step; 	// increase by step
		setImgOpacity();
	}
	if (Opacity == 100 && runFade == true) {		// max opacity
		clearTimers();
		setTimeout('hide1 = setInterval("fadeOut()",fadeDelay)', 5*1000);
	}
}
function fadeOut() {		// the first function called, passes execution to fadeIn() on 1st run 
	document.getElementById("controls").style.display = "block";
	if (Opacity > 0 && runFade == true) {		// Decrement opacity value by 2% per iteration, used with setInterval()
		Opacity -= step;		// the 2% decrease
		setImgOpacity();
	}
	if (Opacity == 0 && runFade == true) {			// * execution starts here *
		clearTimers();
		//alert("hide: "+hide+"; show: "+show)
		if (document.cookie.indexOf("currentSlide") > -1) {
			crushCookie();		// gets imgNum
			if (imgNum < (prefix.length-1))	{ // true on 1st run
				//crushCookie();
				document.getElementById("slide-pane").src = rootDir + prefix[imgNum+1] + ".jpg";
				document.getElementById("imgLink").href = link[imgNum+1];
				bumpCookie();
				/*print("<br />Line 194<br />document.cookie: "+document.cookie);*/
			}
			if (imgNum == (prefix.length-1)) {		// we've gone through all the imgs
				resetCookie();		// to zero
				crushCookie();
				/*print("<br />Line 202<br />document.cookie: "+document.cookie);*/
				document.getElementById("slide-pane").src = rootDir + prefix[imgNum] + ".jpg";
				document.getElementById("imgLink").href = link[imgNum];
			}
		}
		else {
			document.cookie = "currentSlide="+0+"";
			crushCookie();		// gets imgNum
			document.getElementById("slide-pane").src = rootDir + prefix[imgNum] + ".jpg";
			document.getElementById("imgLink").href = link[imgNum];
			/*print("<br />Line 217<br />document.cookie: "+document.cookie);*/
		}
		show1 = setInterval('fadeIn()',fadeDelay);		// begin the fade in
	}
}
function stopAnimation() {	//alert("Exec: stopAnimation()");
	clearTimers();
	runFade = false;
	Opacity = 100;
	setImgOpacity();
	document.getElementById('play_pause').src = rootDir +'PLAY.jpg';
	document.getElementById('play_pause').title = 'Play';
	return;
}
function startAnimation() {	
	clearTimers();
	runFade = true;
	Opacity = 100;
	setImgOpacity();
	document.getElementById('play_pause').src = rootDir +'PAUSE.jpg';
	document.getElementById('play_pause').title = 'Pause';
	hide2 = setInterval("fadeOut()",fadeDelay);
}
function playOrPause() {
	//alert("Exec: playOrPause() and runfade == "+runFade);
	if (runFade == false) {	
		//alert("Exec: playOrPause() and runfade == "+runFade);
		startAnimation();
		return;
	}
	else if (runFade == true) {	
		//alert("Exec: playOrPause() and runfade == "+runFade);
		stopAnimation();
		return;
	}
}
function negCookie() {
	crushCookie();
	if (imgNum > 0) {
		document.cookie = "currentSlide="+(imgNum-1)+"";
	}
	if  (imgNum == 0) {
		document.cookie = "currentSlide="+(prefix.length-1)+"";
	}
	return;
}
function goBack() {
	stopAnimation();
	negCookie();
	crushCookie();
	document.getElementById("slide-pane").src = rootDir + prefix[(imgNum)] + ".jpg";
	document.getElementById("imgLink").href = link[imgNum];
	/*print("<br />Line 300<br />document.cookie: "+document.cookie);*/
}
function goNext () {
	stopAnimation();
	crushCookie();
	if (imgNum == (prefix.length-1)) {
		resetCookie();
		document.getElementById("slide-pane").src = rootDir + prefix[0] + ".jpg";
		document.getElementById("imgLink").href = link[0];
	}
	if (imgNum < (prefix.length-1)) {
		document.getElementById("slide-pane").src = rootDir + prefix[(imgNum+1)] + ".jpg";
		document.getElementById("imgLink").href = link[imgNum+1];
		bumpCookie();
	}
	/*print("<br />Line 317<br />document.cookie: "+document.cookie);*/
}

if (prefix.length != link.length) {
	alert('javascript error: prefix.length != link.length ')
}

function populatePreloadDiv() { //inject one empty img element into preload div per iteration
	img = document.createElement('img')
	img.setAttribute('id','p'+preloadCounter+'')
	img.setAttribute('src','')
	document.getElementById("preloads").appendChild(img);
	preloadCounter++;
}

/* Begin Execution Here */
for (x=prefix.length;x>0;x--) {
		populatePreloadDiv()
}
preload();
window.onload = function(){selectiveLoad(); fadeOut();}
