
// Main Exit
function mainExit(event) {
	Enabler.exit('Main Exit');	
	tl.totalProgress(1);
}

// ctaExit
function ctaExit(event) {
	Enabler.exit('CTA Exit');

}

// Listen for exits
el('frame4Cta').addEventListener('click', ctaExit);