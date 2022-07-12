import "./components/cutButton"
import "./components/hexagonNumber"
import "./components/dragSlider"
import "./preloader"
import "./mainpage"
import "../scss/index.scss"

let video = document.querySelector('.video-container');
let galacticMission = document.querySelector('.galacticMission');
let sendBtn = document.getElementById('sendBtn');
const closeBtn = document.getElementById('closeBtn');
const tensetLink = document.getElementById('tensetLink');
const closeModalBtn = document.querySelector('.close-button');
const validation = document.getElementById('validation');
const modal = document.getElementById('modal');

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
		createErrorModal(error);
	})
}

function createErrorModal(error) {
	const selectedLang = window.location.pathname.slice(1,3);
	const modalMsg = translateMessage(selectedLang, 'ERROR');
	const formControl = document.getElementById('form-control');
	const formHeader = document.getElementById('form-header');
	const sendBtn = document.getElementById('sendBtn');
	const closeBtn = document.getElementById('closeBtn');

	formHeader.innerHTML = `<div class="${modalMsg.headerClass}">${modalMsg.header}</div>`;
	formControl.innerHTML = `<div class="modal-content">${modalMsg.message}</div>`;
	sendBtn.classList.add('display-none');
	closeBtn.classList.remove('display-none');
}

function translateMessage(selectedLang, messageCode) {
	let message = '';
	let header = '';
	let btn = '';
	let methodBtn = '';
	let headerClass = ''
	let tensetUrl = '';
	let submessage = '';
	if (selectedLang == 'en') {
		switch(messageCode){
			case 'MSG0': {
				header = 'Ups! Something goes wrong!';
				message = 'Sended wallet addres should not be empty.';
				btn = 'Close';
				headerClass = 'error';
				break;
			}
			case 'MSG1': {
				header = 'You joined earlier to Whitelist';
				message = 'You can buy ADRIA token in presale.';
				btn = 'Close ';
				headerClass = 'success';
				break;
			}
			case 'MSG2':
				{
					header = 'You joined to Whitelist';
					message = 'You can buy ADRIA token in presale.';
					btn = 'Close';
					headerClass = 'success';
					break;
				}
			case 'MSG3':
				{
					header = 'You cannot add to Whitelist';
					message = 'Only subscribers of the listed Tenset plans can join:';
					submessage = 'Want to become a subscriber?';
					btn = 'GO TO TENSET';
					headerClass = 'error';
					tensetUrl = 'https://www.tenset.io/'
					break;
				}
			case 'MSG4':
				{
					header = 'Not correct wallet address';
					message = 'This is not correct wallet address. Please check and try again.';
					btn = 'Close';
					headerClass = 'error';
					break;
				}
			case 'MSG5':
				{
					header = 'Ups! Something goes wrong!';
					message = 'Tenset server not response. Please try later.';
					btn = 'Close';
					headerClass = 'error';
					break;
				}
			case 'ERROR':
				{
					header = 'Ups! Something goes wrong!';
					message = 'Try again after one minute.';
					btn = 'Close';
					headerClass = 'error';
					break;
				}
			default:
				{
					header = 'Join to Whitelist',
					message = 'Type your wallet address.',
					btn = 'Join'
					break;
				}
		}
	} else {
		switch(messageCode){
			case 'MSG0': {
				header = 'Ups! Coś poszło nie tak!';
				message = 'Przesłany adres portfela nie powinien być pusty.';
				btn = 'Zamknij';
				headerClass = 'error';
				break;
			}
			case 'MSG1': {
				header = ' Dołączyłeś już wcześniej do Whitelist';
				message = 'Bedziesz mógł kupić token ADRIA w przedsprzedaży.';
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
					header = 'Nie możesz dołączyć do Whitelist';
					message = 'Dołączyc mogą tylko subskrybenci wymienionych planów Tenset:';
					submessage = 'Chcesz zostać subskrybentem?';
					btn = 'PRZEJDŹ DO TENSET';
					headerClass = 'error';
					tensetUrl = 'https://www.tenset.io/'
					break;
				}
			case 'MSG4':
				{
					header = 'Ups! Coś poszło nie tak!';
					message = 'To nie jest poprawna składnia portfela';
					btn = 'Zamknij';
					methodBtn = 'closeModalResponse';
					headerClass = 'error';
					break;
				}
			case 'MSG5':
				{
					header = 'Ups! Coś poszło nie tak!';
					message = 'Serwer Tenset nie odpowiada. Proszę spróbować później.';
					btn = 'Zamknij';
					headerClass = 'error';
					break;
				}
			case 'ERROR':
				{
					header = 'Ups! Coś poszło nie tak!';
					message = 'Proszę spróbować później za minutę.';
					btn = 'Close';
					headerClass = 'error';
					break;
				}
			default:
				{
					header = 'Dołącz do Whitelist',
					message = 'Wprowadź adres swojego portfela.',
					btn = 'Dołącz'
					break;
				}
		}
	}

	return {
		message: message,
		submessage: submessage,
		header: header,
		headerClass: headerClass,
		btn: btn,
		methodBtn: methodBtn,
		tensetUrl: tensetUrl
	};
}

async function addWishList() {
	const spinner = document.getElementById('spinner');
	const form = document.getElementById('wallet-form');
	const method= 'POST';
	const url = 'https://mayhemwhitelistapi.azurewebsites.net/WhiteList';

	let walletAddress = document.getElementById('wallet-address').value;
	const wallet = {
		"wallet": walletAddress
	};

	const selectedLang = window.location.pathname.slice(1,3);
	spinner.classList.remove('display-none');
	form.classList.add('display-none');

	const response = await sendHttpRequest(method, url, wallet);

	spinner.classList.add('display-none');
	form.classList.remove('display-none');

	const modalInfo = translateMessage(selectedLang, response.messageCode);
	const formControl = document.getElementById('form-control');
	const formHeader = document.getElementById('form-header');
	const sendBtn = document.getElementById('sendBtn');
	const closeBtn = document.getElementById('closeBtn');

	if (modalInfo.submessage === '') {
		formControl.innerHTML = `<div class="modal-content">${modalInfo.message}</div>`;
	} else {
		formControl.innerHTML = `
		<div class="modal-content">
		${modalInfo.message}
		<ul class="list-style-none">
			<li>TGLP</li>
			<li>Infinity premium</li>
			<li>TGLP NFT Holders</li>
		</ul>
		<div class="b-line"></div>
		<div class="mt-2">${modalInfo.submessage}</div>
		</div>
		`
	}

	formHeader.innerHTML = `<div class="${modalInfo.headerClass}">${modalInfo.header}</div>`;

	if (modalInfo.tensetUrl === '') {
		sendBtn.classList.add('display-none');
		closeBtn.classList.remove('display-none');
	} else {
		sendBtn.classList.add('display-none');
		tensetLink.classList.remove('display-none');
	}
}

closeModalBtn.addEventListener('click', () => {
	const modal = document.getElementById('modal');
	closeModal(modal);
	setDefaultModal();
});

sendBtn.addEventListener('click', event => {
	event.preventDefault();
	try {
		addWishList();
	} catch(error) {
		console.log(error.message);
	}
});

closeBtn.addEventListener('click', () => {
	const modal = document.getElementById('modal');
	closeModal(modal);
	setDefaultModal();
});

tensetLink.addEventListener('click', () => {
	window.open('https://www.tenset.io/', "_blank");
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


function setDefaultModal() {
	const formControl = document.getElementById('form-control');
	const formHeader = document.getElementById('form-header');
	const selectedLang = window.location.pathname.slice(1,3);
	const modalInfo = translateMessage(selectedLang, 'none');
	const sendBtn = document.getElementById('sendBtn');

	formHeader.innerHTML = `<p>${modalInfo.header}</p>`;
	formControl.innerHTML = `
	<label for="wallet-address">${modalInfo.message}</label>
	<div class="input-wrapper mt-1">
		<textarea placeholder="0x3F939356d15952b92495848667e40AE36F74813c" rows="3" id="wallet-address" required></textarea>
	</div>`;
	sendBtn.classList.remove('display-none');
	closeBtn.classList.add('display-none');
	tensetLink.classList.add('display-none');
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