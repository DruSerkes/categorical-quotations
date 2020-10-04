// TODO

// make the x kill the alert
// add a button that will save a quote to localStorage

const closeBtn = document.querySelector('.close');
const flash = document.getElementById('flash');

closeBtn.addEventListener('click', () => {
	flash.remove();
});
