// Engages Strict Mode for faster performance
"use strict";

// Get element by ID shortcut
var El = function(e){
	return document.getElementById(e);
}

// jQuery class selectors
function hasClass(ele, cls) {
	return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
function addClass(ele, cls) {
	if (!hasClass(ele, cls)) ele.className += (ele.className==""?"":" ")+cls;
};	
function removeClass(ele, cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
};

// addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){
	if(win.addEventListener)return;		//No need to polyfill

	function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			var e = e || win.event;
			e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
			e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
			fn.call(self, e);
		});
	}
	function addListen(obj, i){
		if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
		else obj.addEventListener = addEvent;
		return obj;
	}

	addListen([doc, win]);
	if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
	else{																			//IE < 8
		doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
		docHijack('getElementsByTagName');
		docHijack('getElementById');
		docHijack('createElement');
		addListen(doc.all);	
	}
})(window, document);

// Detecting IE
var div = document.createElement("div");
div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
var isIeLessThan9 = (div.getElementsByTagName("i").length == 1);

// DoubleClick specific scripts
window.onload = function() {
	
	if (Enabler.isInitialized()) {															// If Enabler has loaded
		init();																				// Fire Initializer
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, init);						// Wait for Enabler event
	}

	function init() {																		// Initialiser Event
		if (Enabler.isPageLoaded()) {														// If page has loaded
			politeInit();																	// Run polite load
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);	// Wait for page load
		}
	}

	// Polite load event
	function politeInit() {
		document.getElementById("border").style.opacity = 1;
		document.getElementById("loading").style.opacity = 0;
		document.getElementById("border").style.display = "block";
		enablerInitHandler();
	}
}

// dateSwitch
var dateSwitch = function(releaseDate, preRelease) {			// Define "dateSwitch" function

	var today = new Date();										// Store todays date in full
	var releaseDate = new Date(releaseDate);					// Store todays date in full as new variable ("releaseDate")
	if(preRelease) var preRelease = new Date(preRelease);		// If today is within "preRelease" store todays date as n
	today.getFullYear();										// Get current year

	// Date format for console log
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var logToday = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate() + " [" + days[today.getDay()] + "]";
	var logPreRelease = preRelease.getFullYear() + "-" + ("0" + (preRelease.getMonth() + 1)).slice(-2) + "-" + preRelease.getDate() + " [" + days[preRelease.getDay()] + "]";
	var logRelease = releaseDate.getFullYear() + "-" + ("0" + (releaseDate.getMonth() + 1)).slice(-2) + "-" + releaseDate.getDate() + " [" + days[releaseDate.getDay()] + "]";
	
	// Log date switch dates
	console.log(
		" // -- Release Dates -- //", "\n",
		"Todays Date:      ", logToday, "\n",
		"Pre Release Date: ", logPreRelease, "\n",
		"Release Date:     ", logRelease
		||
		"Not set"
	);

	if(preRelease) {																	// If "preRelease" is defined

		if(releaseDate < preRelease) {													// If "releaseDate" is before "preRelease"
			throw new Error("releaseDate is before preRelease. Reverse their order");	// Throw error message
		}
		if(today < preRelease) {														// If today is before "preRelease"
			return "Release 1";															// Return "Release 1"
		}
		if(today < releaseDate) {														// If today is after "preRelease" and before "releaseDate"
			return "Release 2";															// Return "Release 2"
		}
	}

	if( today < releaseDate ) {															// If today is before "releaseDate"
		return "Release 3";																// Return "Release 3"
	} else {																			// If today is after "releasDate"
		return "Release 4";																// Return "Release 4"
	}
}

// Set Date Variables
var date = dateSwitch(
	"2016-04-29", 																	// releaseDate
	"2016-04-28"																	// preRelease
);

var frame1Example = El('frame1Example');
var frame2Example = El('frame2Example');

// Switch Statement
switch (date) {

	case "Release 1":																// Release 3
		break;

	case "Release 2": 																// Release 2
		break;

	case "Release 3": 																// Release 3
		document.getElementById('frame1Example').innerHTML='Release 3 Message';
		document.getElementById('frame2Example').innerHTML='Release 3 Message';
		break;

	case "Release 4": 																// Release 4
		document.getElementById('frame1Example').innerHTML='Release 4 Message';
		document.getElementById('frame2Example').innerHTML='Release 4 Message';
		break;

	default:
		// Do nothing
}

// Run IE specific Animation
function enablerInitHandler() {
	if (isIeLessThan9) {
		anim1Ie();
	} else {
		anim1();
	}
}

// Timelines
var _tl = new TimelineLite();										// Timeline for element initial state
var tl1 = new TimelineMax({repeat:0, ease:Expo.easeOut});			// Frame 1 timeline
var tl2 = new TimelineMax({repeat:0, ease:Expo.easeOut});			// Frame 2 timeline
var tl3 = new TimelineMax({repeat:0, ease:Expo.easeOut});			// Frame 3 timeline

// Fallback Animation funtion for IE
function anim1Ie() {
	var messages = El("messages");
	var border = El("border");
	var tl = new TimelineMax({repeat:1});
	var tween = tl.to(border, 30, {css:{backgroundPosition: "0 100%"}, ease: Expo.easeInOut});
}

// Frame 1 Animation
function anim1() {

	// Element initial state
	_tl.set(animation, {autoAlpha:0});								// Hide animation
	_tl.set(bgExit, {autoAlpha:0});									// Hide bgExit
	_tl.set(frame1, {autoAlpha:1});									// Hide frame1
	_tl.set(frame1Example, {autoAlpha:0});							// Hide frame1Example
	_tl.set(frame2, {autoAlpha:0});									// Hide frame2
	_tl.set(trailerContainer, {autoAlpha:0});						// Hide trailerContainer
	_tl.set(trailer, {autoAlpha:0});								// Hide trailer
	_tl.set(frame2Example, {autoAlpha:0});							// Hide frame2Example
	_tl.set(cta, {autoAlpha:0});									// Hide cta

	// Tween
	tl1.to(animation, 0.25, {autoAlpha:1});							// Show animation
	tl1.to(bgExit, 0, {autoAlpha:1});								// Show bgExit
	tl1.to(frame1, 0.25, {autoAlpha:1});							// Show frame1
	tl1.to(frame1Example, 0.25, {autoAlpha:1});						// Show frame1Example
	tl1.to(frame1Example, 0, {delay:2});							// Show frame1Example
	tl1.call(anim2);												// Play anim2
}

// Frame 2 Animation
function anim2() {

	// Tween
	tl2.to(frame2, 0.25, {autoAlpha:1});							// Show frame2
	tl2.to(trailerContainer, 0.25, {autoAlpha:1}, "-=0.25");		// Show trailerContainer
	tl2.to(trailer, 0.25, {autoAlpha:1}, "-=0.25");					// Show video element
	tl2.call(playTrailer);											// Run playTrailer
	tl2.to(frame1, 0, {autoAlpha:0});								// Hide frame1
	tl2.to(frame2Example, 0.25, {autoAlpha:1}, "+=0.5");			// Hide frame2Example
	tl2.to(cta, 0.25, {autoAlpha:1});								// Hide cta
}

// Exit Animation
function exit() {

	// Element initial state
	_tl.set(frame1, {autoAlpha:0});									// Hide frame1
	_tl.set(frame1Example, {autoAlpha:0});							// Hide frame1Example
	_tl.set(frame2, {autoAlpha:0});									// Hide frame2
	_tl.set(trailerContainer, {autoAlpha:0});						// Hide trailerContainer
	_tl.set(trailer, {autoAlpha:0});								// Hide trailer
	_tl.set(frame2Example, {autoAlpha:0});							// Hide frame2Example
	_tl.set(cta, {autoAlpha:0});									// Hide cta

	// Tween
	tl3.play();
	trailer.pause();
	tl3.to(frame2, 0.25, {autoAlpha:1});							// Hide frame2
	tl3.to(trailerContainer, 0.25, {autoAlpha:1}, "-=0.25");		// Hide trailerContainer
	tl3.to(trailer, 0, {autoAlpha:0});								// Hide trailer
	tl3.to(frame2Example, 0.25, {autoAlpha:1}, "-=0.25");			// Hide frame2Example
	tl3.to(cta, 0.25, {autoAlpha:1}, "-=0.25");						// Hide cta
}

// playTrailer
function playTrailer() {

	Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {	// Load video module
		studio.video.Reporter.attach('video', trailer);				// Enable local video metrics
		tl2.to(trailer, 0.5, {autoAlpha:1});						// Show frame 2 video element
		tl3.to(trailer, 0.5, {autoAlpha:1});						// Show farme 3 video element
		trailer.play();												// Play video
		trailer.muted = true;										// Mute video
	});

	trailer.addEventListener('ended', videoEnd, false);				// Run videoEnd when video has ended

	function videoEnd(e) {											// videoEnd function
		tl2.to(trailer, 0.5, {autoAlpha:0});						// Hide frame2 video element
		tl3.to(trailer, 0.5, {autoAlpha:0});						// Hide frame3 video element
		studio.video.Reporter.detach('trailer');					// Remove local video metrics
	}
}
document.getElementById('trailerContainer').addEventListener('click', playTrailer, false);

// Main Exit
function mainExit(event) {
	Enabler.exit('Background Exit');	
	tl1.pause();
	tl2.pause();
	exit();
}

// ctaExit
function ctaExit(event) {
	Enabler.exit('CTA Exit');
	tl1.pause();
	tl2.pause();
	exit();
}

// Listen for exits
El('bgExit').addEventListener('click', mainExit, false);
El('cta').addEventListener('click', ctaExit, false);
// Image Preloader
// function preloadImage(url) {
//     var img = new Image();
//     img.src = "../img/cta-hover.png";
// }