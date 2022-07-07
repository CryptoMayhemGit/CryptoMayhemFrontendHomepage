import "./components/cutButton"
import "./components/hexagonNumber"
import "./components/dragSlider"
import "./preloader"
import "./mainpage"
import "../scss/index.scss"

let video = document.querySelector('.video-container');
let galacticMission = document.querySelector('.galacticMission');
const sendBtn = document.getElementById('sendBtn');
const closeModalBtn = document.querySelector('.close-button');
const modal = document.getElementById('modal');
const wishListBtn = document.getElementById('wish-list');


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

function sendHttpRequest(method, url, data) {
	return fetch(url, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			return response.json().then(errData => {
				throw new Error('Error');
			});
		}
	}).catch(error => {
		throw new Error('Something wrong!');
	})
}

function translateMessage(selectedLang, messageCode) {
	let message = '';
	let header = '';
	let btn = '';
	let methodBtn = '';
	let headerClass = ''
	let tensetUrl = null;
	if (selectedLang == 'en') {
		switch(messageCode){
			case 'MSG0': {
				message = 'Waller parameter is empty.';
				header = 'Ups! Something goes wrong!';
				btn = 'Close';
				headerClass = 'error';
				break;
			}
			case 'MSG1': {
				message = 'You can buy ADRIA token in presale.';
				header = 'You joined earlier to Whitelist';
				btn = 'Close ';
				headerClass = 'success';
				break;
			}
			case 'MSG2':
				{
					message = 'You can buy ADRIA token in presale';
					header = 'You joined to Whitelist';
					btn = 'Close';
					headerClass = 'success';
					break;
				}
			case 'MSG3':
				{
					message = 'Only Tenset subscribers ';
					header = 'You cannot add to Whitelist';
					btn = 'Go to Tenset';
					headerClass = 'error';
					break;
				}
			case 'MSG4':
				{
					message = 'This is not correct wallet address. Please check. ';
					header = 'Not correct wallet address';
					btn = 'Close';
					headerClass = 'error';
					break;
				}
			case 'MSG5':
				{
					message = 'Tenset server not response. Please try later.';
					header = 'Ups! Something goes wrong!';
					btn = 'Close';
					headerClass = 'error',
					tensetUrl = 'https://www.tenset.io/'
					break;
				}
			default:
				{
					header = 'Join to Whitelist',
					message = 'Type your wallet address',
					btn = 'Join'
					break;
				}
		}
	} else {
		switch(messageCode){
			case 'MSG0': {
				message = 'Parametr wallet jest pusty.';
				header = 'Ups! Coś poszło nie tak!';
				btn = 'Zamknij';
				headerClass = 'error';
				break;
			}
			case 'MSG1': {
				message = 'Bedziesz mógł kupić token ADRIA w przedsprzedaży';
				header = ' Dołączyłeś już wcześniej do Whitelist';
				btn = 'Zamknij';
				headerClass = 'success';
				break;
			}
			case 'MSG2':
				{
					header = 'Dołączyłeś do Whitelist';
					message = 'Będziesz mógł kupić token ADRIA w przedsprzedaży';
					btn = 'Zamknij';
					headerClass = 'success';
					break;
				}
			case 'MSG3':
				{
					message = 'Dołączyc mogą tylko subskrybenci wymienonwych planów Tenset';
					header = 'Nie możesz dołączyć do Whitelist';
					btn = 'PRZEJDŹ DO TENSET';
					headerClass = 'error';
					break;
				}
			case 'MSG4':
				{
					message = 'To nie jest poprawna składnia portfela';
					header = 'Ups! Coś poszło nie tak!';
					btn = 'Zamknij';
					methodBtn = 'closeModalResponse';
					headerClass = 'error';
					break;
				}
			case 'MSG5':
				{
					message = 'Serwer Tenset nie odpowiada. Proszę spróbować później.';
					header = 'Ups! Coś poszło nie tak!';
					btn = 'Zamknij';
					headerClass = 'error';
					break;
				}
			default:
				{
					header = 'Dołącz do Whitelist',
					message = 'Wprowadź adres swojego portfela',
					btn = 'Dołącz'
					break;
				}
		}
	}

	return {
		message: message,
		header: header,
		headerClass: headerClass,
		btn: btn,
		methodBtn: methodBtn,
		tensetUrl: tensetUrl
	};
}

async function addWishList() {
	const method= 'POST';
	const url = 'http://mayhemwhitelistapi.azurewebsites.net/WhiteList';
	const walletAddress = document.getElementById('wallet-address').value;
	const wallet = {
		"wallet": walletAddress
	};
	const selectedLang = window.location.pathname.slice(1,3);
	const response = await sendHttpRequest(method, url, wallet);

	const modalInfo = translateMessage(selectedLang, response.messageCode);
	const formControl = document.getElementById('form-control');
	const formHeader = document.getElementById('form-header');
	const modalFoot = document.getElementById('modal-foot');

	formControl.innerHTML = `<div class="modal-content">${modalInfo.message}</div>`;
	formHeader.innerHTML = `<div class="${modalInfo.headerClass}">${modalInfo.header}</div>`;

	if (modalInfo.tensetUrl) {
		modalFoot.innerHTML = `<a href=${modalInfo.tensetUrl}>${modalInfo.methodBtn}</a>`
	} else {
		modalFoot.innerHTML = `<cut-button onclick="${modalInfo.methodBtn}" class="buyAdriaButton pointer">${modalInfo.btn}</cut-button>`;
	}
}


closeModalBtn.addEventListener('click', () => {
	modal.classList.remove('active');
});

sendBtn.addEventListener('click', event => {
	//"0x3F939356d15952b92495848667e40AE36F74813c"
	event.preventDefault();
	try {
		addWishList();
	} catch(error) {
		console.log(error.message);
	}
});

const openModalButtons = document.getElementById('open-modal');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.addEventListener('click', () => {
const modal = document.querySelector('#modal');
openModal(modal)
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
	setDefaultModal();
  })
});

function setDefaultModal() {
	const formControl = document.getElementById('form-control');
	const formHeader = document.getElementById('form-header');
	const modalFoot = document.getElementById('modal-foot');
	const selectedLang = window.location.pathname.slice(1,3);
	console.log(selectedLang);
	const modalInfo = translateMessage(selectedLang, 'none');

	formControl.innerHTML = `<p>${modalInfo.header}</p>`;
	formHeader.innerHTML = `
	<label for="wallet-address">${modalInfo.message}</label>
	<div class="input-wrapper mt-1">
		<textarea placeholder="0x3F939356d15952b92495848667e40AE36F74813c" rows="3" id="wallet-address" required></textarea>
	</div>`;
	modalFoot.innerHTML = `<cut-button id="sendBtn" class="buyAdriaButton pointer">${modalInfo.btn}</cut-button>`;
}

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active-modal');
  overlay.classList.add('active-modal');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active-modal');
  overlay.classList.remove('active-modal');
}