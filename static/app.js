const closeBtn = document.querySelector('.close');
const flash = document.getElementById('flash');
const favBtn = document.querySelector('.favorite');
const favList = document.querySelector('.favorites-container');
const id = favBtn.dataset.id;
const quote = favBtn.dataset.quote;
const author = favBtn.dataset.author;
const title = favBtn.dataset.title;
const category = favBtn.dataset.category;
const background = favBtn.dataset.background;
// favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

// set favoites button text and id
if (favorites[id]) {
	favBtn.innerText = 'Remove from favorites';
	favBtn.setAttribute('id', 'remove');
} else {
	favBtn.setAttribute('id', 'add');
}

// favorite button
favBtn.addEventListener('click', () => {
	if (favBtn.getAttribute('id') === 'add') {
		addFavorite();
	} else {
		removeFavorite();
	}
});

// remove flashed message
closeBtn.addEventListener('click', () => {
	flash.remove();
});

if (favList) renderFavoriteList();

/**
 * Helpers
 */

/**
 * Add a favorite
 */
const addFavorite = () => {
	let newFavQuote = { id, quote, author, title, category, background };
	favorites = { ...favorites, [id]: newFavQuote };
	localStorage.setItem('favorites', JSON.stringify(favorites));
	console.log('favorites ==', favorites);
	favBtn.setAttribute('id', 'remove');
	favBtn.innerText = 'Remove from favorites';
};

/**
 * Remove a favorite
 */
const removeFavorite = () => {
	delete favorites[id];
	localStorage.setItem('favorites', JSON.stringify(favorites));
	favBtn.setAttribute('id', 'add');
	favBtn.innerText = 'Add to favorites';
};

/**
 * Render a list of favorites
 */
const renderFavoriteList = () => {
	Object.values(favorites).forEach((fav) => {
		const favHTML = generateFavoriteItemHTML(fav);
		favList.append(favHTML);
	});
};

/** Generate HTML for a list item 
 * 
 * @param {*} fav object - contains id, quote, author, title, background, category 
 */
const generateFavoriteItemHTML = (fav) => {
	return `
	<li class="favorite-item" id="${fav.id}">
	<p>${fav.quote} 
	<small>${fav.author}</small>
	</p>
	<button class="remove-fav">X</button>
	</li>
	`;
};
