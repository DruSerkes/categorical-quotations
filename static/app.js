'use strict';
const closeBtn = document.querySelector('.close') || null;
const flash = document.getElementById('flash') || null;
const favBtn = document.querySelector('.favorite-btn') || null;
const favList = document.querySelector('.favorites-container') || null;
const removeFav = document.querySelector('.remove-fav') || null;
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

// listen for clicks to remove favorites from favList
if (favList) {
	favList.addEventListener('click', (event) => {
		const button = event.target.closest('button');
		if (!button) return;
		if (!favList.contains(button)) return;
		const id = button.getAttribute('id');
		deleteFavorite(id);
		removeParentLI(button);
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

/** Deletes favorite from localStorage
 * 
 * @param {*} id (str)
 */
function deleteFavorite(id) {
	delete favorites[id];
	localStorage.setItem('favorites', JSON.stringify(favorites));
}

/** Removes the closest parent LI node 
 * 
 * @param {*} node HTML childnode of an li tag
 */
function removeParentLI(node) {
	const parent = node.closest('li');
	parent.remove();
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
	<li class="favorite-item">
	<p>"${fav.quote}"
	<small>-<em>${fav.author}</em></small>
	</p>
	<button id="${fav.id}" class="remove-fav">X</button>
	</li>
	`;
}
