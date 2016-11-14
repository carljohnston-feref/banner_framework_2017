
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