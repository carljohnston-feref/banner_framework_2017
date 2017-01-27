
// Timelines
var _tl = new TimelineLite();						// Timeline for element initial state
var tl = new TimelineLite({paused:true});			// Frame 1 timeline

// Frame 1 Animation
function anim() {

	// Call Animation Sequence
	tl.totalDuration(30);
	tl.play();
	tl.call(anim1);

	// Define Animation Sequence
	function anim1(){
		Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
			studio.video.Reporter.attach('frame1Video', frame1Video);
			frame1Video.muted = true;
			frame1Video.play();
		});
		tl.to(frame1, 0.5, {autoAlpha:1, zIndex:1});

		function videoEnd() {
			studio.video.Reporter.detach('frame1Video');
			tl.play();
			frame1Video.pause();
			tl.call(anim2);
		}
		el('frame1Video').addEventListener('ended', videoEnd);
		el('frame1Video').addEventListener('click', videoEnd);
	}

	function anim2() {
		_tl.set(['.frame3Quote#quote1', '.frame3Quote#quote2', '.frame3Quote#quote3', '.frame3Reference#reference1', '.frame3Reference#reference2', '.frame3Reference#reference3', '#frame4Logo', '#frame4Title', '#frame4Release', '#frame4Cta'], {autoAlpha:0});

		tl.to('#frame1', 0.5, {autoAlpha:0, zIndex:0})

		  // Frame 2
		  .from('#frame2', 0, {autoAlpha:0})
		  .to('#frame2', 1, {autoAlpha:1, zIndex:1})
		  .to('#frame2', 1, {autoAlpha:0, zIndex:0, delay:2})

		  // Frame 3 Fade
		  .from('#frame3', 0, {autoAlpha:0, zIndex:0})
		  .to('#frame3', 1, {autoAlpha:1, zIndex:1})

		  // Frame 3 (Review 1)
		  .to('.frame3Quote#quote1', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=0.5")
		  .to('.frame3Reference#reference1', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")

		  // Frame 3 (Review 2)
		  .to('.frame3Quote#quote2', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")
		  .to('.frame3Reference#reference2', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")

		  // Frame 3 (Review 3)
		  .to('.frame3Quote#quote3', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")
		  .to('.frame3Reference#reference3', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")

		  // Frame 3 Fade
		  .to('#frame3', 1, {autoAlpha:0, zIndex:0, delay:2})

		  // Frame 4 Fade
		  .from('#frame4', 0, {autoAlpha:0, zIndex:0})
		  .to('#frame4', 1, {autoAlpha:1, zIndex:1})

		  // Frame 4 Animations
		  .to('#frame4Logo', 1.5, {autoAlpha:1})
		  .to('#frame4Title', 1.5, {autoAlpha:1}, "-=1.25")
		  .to('#frame4Release', 1.5, {autoAlpha:1}, "-=1.25")
		  .to('#frame4Cta', 1.5, {autoAlpha:1}, "-=1.25");
	}
}