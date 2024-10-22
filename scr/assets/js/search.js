// search.js
const GENRES = [
  'Action',
  'Adventure',
  'Avant Garde',
  'Award Winning',
  'Comedy',
  'Drama',
  'Fantasy',
  'Gourmet',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Suspense',
];
let activeGenres = [];

function initializeGenres() {
  const genreContainer = document.getElementById('genre-filters');
  GENRES.sort().forEach((genre) => {
    const button = document.createElement('button');
    button.textContent = genre;
    button.dataset.genre = genre.toLowerCase();
    button.addEventListener('click', () => toggleGenre(button));
    genreContainer.appendChild(button);
  });
}
initializeGenres();
