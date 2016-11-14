
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