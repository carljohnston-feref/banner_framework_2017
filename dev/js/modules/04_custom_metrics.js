// YouTube Video Reporting
var player = document.getElementById('frame4Video');
 
player.addEventListener('buffering', function() {
	Enabler.counter('Video trailer buffering', true);
}, false);
player.addEventListener('ended', function() {
	Enabler.counter('Video trailer ended', true);
}, false);
player.addEventListener('paused', function() {
	Enabler.counter('Video trailer paused', true);
}, false);
player.addEventListener('playing', function() {
	Enabler.counter('Video trailer playing', true);
}, false);
 
var videoProgress;
player.addEventListener('viewed0percent', function() {
    videoProgress = 0;
    Enabler.counter('Video trailer 0 percent', true);
}, false);
player.addEventListener('viewed25percent', function() {
    videoProgress = 25;
    Enabler.counter('Video trailer 25 percent', true);
}, false);
player.addEventListener('viewed50percent', function() {
    videoProgress = 50;
    Enabler.counter('Video trailer 50 percent', true);
}, false);
player.addEventListener('viewed75percent', function() {
    videoProgress = 75;
    Enabler.counter('Video trailer 75 percent', true);
}, false);
player.addEventListener('viewed100percent', function(){
    videoProgress = 100;
    Enabler.counter('Video trailer 100 percent', true);
}, false);

// document.getElementById('bgExit').addEventListener('click', function() {
//     if(videoProgress == 0){
//         Enabler.counter('Video trailer 0 percent Background clickout', true);
//     }else if(videoProgress == 25){
//         Enabler.counter('Video trailer 25 percent Background clickout', true);
//     }else if(videoProgress == 50){
//         Enabler.counter('Video trailer 50 percent Background clickout', true);
//     }else if(videoProgress == 75){
//         Enabler.counter('Video trailer 75 percent Background clickout', true);
//     }else if(videoProgress == 100){
//         Enabler.counter('Video trailer 100 percent Background clickout', true);
//     }
// }, false);
 
// document.getElementById('cta').addEventListener('click', function() {
//     if(videoProgress == 0){
//         Enabler.counter('Video trailer 0 percent CTA clickout', true);
//     }else if(videoProgress == 25){
//         Enabler.counter('Video trailer 25 percent CTA clickout', true);
//     }else if(videoProgress == 50){
//         Enabler.counter('Video trailer 50 percent CTA clickout', true);
//     }else if(videoProgress == 75){
//         Enabler.counter('Video trailer 75 percent CTA clickout', true);
//     }else if(videoProgress == 100){
//         Enabler.counter('Video trailer 100 percent CTA clickout', true);
//     }
// }, false);
 
// player.addEventListener('previewed0percent', function() {}, false);
// player.addEventListener('previewed25percent', function() {}, false);
// player.addEventListener('previewed50percent', function() {}, false);
// player.addEventListener('previewed75percent', function() {}, false);
// player.addEventListener('previewed100percent', function() {}, false);