import "./components/cutButton"
import "./components/hexagonNumber"
import "./components/dragSlider"
import "./preloader"
import "./mainpage"
import "../scss/index.scss"

let video = document.querySelector('.video-container');
let galacticMissionStartPreSale = document.getElementById("galacticMissionStartPreSale");
let galacticMissionEndPresale = document.getElementById("galacticMissionEndPresale");
let galacticMissionEnd = document.getElementById("galacticMissionEnd");
let buyAdriaOptional = document.getElementById("buyAdriaOptional");
const selectedLang = window.location.pathname.slice(1,3);
function updateHideOrShowVideo() {
	HideOrShowVideo();
    requestAnimationFrame(updateHideOrShowVideo)
}

updateHideOrShowVideo();

function HideOrShowVideo() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st >= 1100){
		video.style.opacity = "0";
		DisableAllSections();
	} else {
		video.style.opacity = "1";
		EnableSection();
	}
}
	
var dateToStartPresale = new Date(Date.UTC(2022,6,31,14,0,0)).getTime();
var dateToEndPresale = new Date(Date.UTC(2022,7,6,14,0,0)).getTime();


SetTimeToEnd();
var x = setInterval(function() {
	SetTimeToEnd();
}, 1000);

function SetTimeToEnd() {
	EnableSection();
}

function SetTimeToStartPresale(now)
{
    var distance = dateToStartPresale - now;
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	if (selectedLang == 'pl') {
			document.getElementById("preSealTimerStart").innerHTML = days + " D <span class=\"separator\">|</span> " + hours + " G <span class=\"separator\">|</span> " + minutes + " M <span class=\"separator\">|</span> " + seconds + " S";
	}
	else
	{
			document.getElementById("preSealTimerStart").innerHTML = days + " D <span class=\"separator\">|</span> " + hours + " H <span class=\"separator\">|</span> " + minutes + " M <span class=\"separator\">|</span> " + seconds + " S";
	}
}

function SetTimeToEndPresale(now)
{
	var	distance = dateToEndPresale - now;
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	if (selectedLang == 'pl') {
			document.getElementById("preSealTimerEnd").innerHTML = days + " D <span class=\"separator\">|</span> " + hours + " G <span class=\"separator\">|</span> " + minutes + " M <span class=\"separator\">|</span> " + seconds + " S";
	}
	else
	{
			document.getElementById("preSealTimerEnd").innerHTML = days + " D <span class=\"separator\">|</span> " + hours + " H <span class=\"separator\">|</span> " + minutes + " M <span class=\"separator\">|</span> " + seconds + " S";
	}
}

function SetGalacticMission()
{
	clearInterval(x);
}

function DisableAllSections()
{
	galacticMissionStartPreSale.style.display = "none";
	galacticMissionEndPresale.style.display = "none";
	galacticMissionEnd.style.display = "none";
	buyAdriaOptional.style.display = "none";
}

function EnableSection()
{
	var now = new Date().getTime();
	
	if (dateToStartPresale > now)
	{
		galacticMissionStartPreSale.style.display = "flex";
		galacticMissionEndPresale.style.display = "none";
		galacticMissionEnd.style.display = "none"
	    buyAdriaOptional.style.display = "inline";
		SetTimeToStartPresale(now);
	}
	else if (dateToStartPresale <= now && dateToEndPresale > now)
	{
		galacticMissionStartPreSale.style.display = "none";
		galacticMissionEnd.style.display = "none";
		galacticMissionEndPresale.style.display = "flex";
	    buyAdriaOptional.style.display = "none";
		SetTimeToEndPresale(now);
	}
	else
	{
		galacticMissionStartPreSale.style.display = "none";
		galacticMissionEndPresale.style.display = "none";
		galacticMissionEnd.style.display = "flex";
		buyAdriaOptional.style.display = "none";
		SetGalacticMission();
	}
}