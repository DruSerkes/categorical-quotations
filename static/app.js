const closeBtn = document.querySelector('.close');
const flash = document.getElementById('flash');
const favBtn = document.querySelector('.favorite');
const id = favBtn.dataset.id;
const quote = favBtn.dataset.quote;
const author = favBtn.dataset.author;
const title = favBtn.dataset.title;
const category = favBtn.dataset.category;
const background = favBtn.dataset.background;
// favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

if (favorites[id]) {
	favBtn.innerText = 'Remove from favorites';
	favBtn.setAttribute('id', 'remove');
} else {
	favBtn.setAttribute('id', 'add');
}

favBtn.addEventListener('click', () => {
	if (favBtn.getAttribute('id') === 'add') {
		addFavorite();
	} else {
		removeFavorite();
	}
});

const addFavorite = () => {
	let newFavQuote = { id, quote, author, title, category, background };
	favorites = { ...favorites, [id]: newFavQuote };
	localStorage.setItem('favorites', JSON.stringify(favorites));
	console.log('favorites ==', favorites);
	favBtn.setAttribute('id', 'remove');
	favBtn.innerText = 'Remove from favorites';
};

const removeFavorite = () => {
	delete favorites[id];
	localStorage.setItem('favorites', JSON.stringify(favorites));
	favBtn.setAttribute('id', 'add');
	favBtn.innerText = 'Add to favorites';
};

// remove flashed message
closeBtn.addEventListener('click', () => {
	flash.remove();
});
