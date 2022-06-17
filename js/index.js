import "./components/cutButton"
import "./components/hexagonNumber"
import "./components/dragSlider"
import "./preloader"
import "./mainpage"
import "../scss/index.scss"

let video = document.querySelector('.video-container');
let galacticMission = document.querySelector('.galacticMission');
	
function updateHideOrShowVideo() {
	HideOrShowVideo();
    requestAnimationFrame(updateHideOrShowVideo)
}
updateHideOrShowVideo();

function HideOrShowVideo() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st >= 1100){
		video.style.opacity = "0";
		galacticMission.style.display = "none";
	} else {
		video.style.opacity = "1";
		galacticMission.style.display = "flex";
	}
}
