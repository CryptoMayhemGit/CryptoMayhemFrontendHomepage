import "./components/cutButton"
import "./components/hexagonNumber"
import "./components/dragSlider"
import "./preloader"
import "./mainpage"
import "../scss/index.scss"

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/*function updateBg() {
    if (!document.location.search.includes('noNoise'))//for better debuging
    {
        for (const element of document.querySelectorAll('html, .headerBg, #section-wrapper')) {
            console.log("test")
            element.style.backgroundPosition = `${Math.round(Math.random() * 1000)}px ${Math.round(Math.random() * 1000)}px`
        }
    }
    requestAnimationFrame(updateBg)
}
updateBg();*/

let lastScrollTop = 0;
addEventListener('scroll', e => {

    let video = document.querySelector('.video-container');
    let galacticMission = document.querySelector('.galacticMission');


    var isElInViewport = isInViewport(document.querySelector('.hideVideo'));
    var st = window.pageYOffset || document.documentElement.scrollTop;


    if(isElInViewport) {
        if (st > lastScrollTop){
            video.style.opacity = "0";
            galacticMission.style.display = "none";
        } else {
            video.style.opacity = "1";
            galacticMission.style.display = "flex";
        }
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false)
