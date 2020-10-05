'use strict';
const closeBtn = document.querySelector('.close') || null;
const flash = document.getElementById('flash') || null;
const favBtn = document.querySelector('.favorite-btn') || null;
const favList = document.querySelector('.favorites-container') || null;
let id, quote, author, title, category, background;
if (favBtn) {
	id = favBtn.dataset.id || null;
	quote = favBtn.dataset.quote || null;
	author = favBtn.dataset.author || null;
	title = favBtn.dataset.title || null;
	category = favBtn.dataset.category || null;
	background = favBtn.dataset.background || null;
}
// favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

// set favoites button text and id
if (favBtn && favorites[id]) {
	favBtn.innerText = 'Remove from favorites';
	favBtn.setAttribute('id', 'remove');
} else if (favBtn) {
	favBtn.setAttribute('id', 'add');
}

// favorite button
if (favBtn) {
	favBtn.addEventListener('click', () => {
		if (favBtn.getAttribute('id') === 'add') {
			addFavorite();
		} else {
			removeFavorite();
		}
	});
}

// remove flashed message
if (flash) {
	closeBtn.addEventListener('click', () => {
		flash.remove();
	});
}

if (favList && !favList.children.length) renderFavoriteList();

/**
 * Helpers
 */

/**
 * Add a favorite
 */
function addFavorite() {
	let newFavQuote = { id, quote, author, title, category, background };
	favorites = { ...favorites, [id]: newFavQuote };
	localStorage.setItem('favorites', JSON.stringify(favorites));
	console.log('favorites ==', favorites);
	favBtn.setAttribute('id', 'remove');
	favBtn.innerText = 'Remove from favorites';
}

/**
 * Remove a favorite
 */
function removeFavorite() {
	delete favorites[id];
	localStorage.setItem('favorites', JSON.stringify(favorites));
	favBtn.setAttribute('id', 'add');
	favBtn.innerText = 'Add to favorites';
}

/**
 * Render a list of favorites
 */
function renderFavoriteList() {
	const myList = document.createElement('ol');
	Object.values(favorites).forEach((fav) => {
		const favHTML = generateFavoriteItemHTML(fav);
		console.log('rendering favorite');
		myList.innerHTML += favHTML;
	});
	favList.append(myList);
}

/** Generate HTML for a list item 
 * 
 * @param {*} fav object - contains id, quote, author, title, background, category 
 */
function generateFavoriteItemHTML(fav) {
	return `
	<li class="favorite-item" id="${fav.id}">
	<p>${fav.quote} 
	<small>${fav.author}</small>
	</p>
	<button class="remove-fav">X</button>
	</li>
	`;
}
