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
let selectYear = 0;
let selectseason = '';

function initializeGenres() {
  const genreContainer = document.getElementById('genre-filters');
  GENRES.sort().forEach((genre) => {
    const button = document.createElement('button');
    button.textContent = genre;
    // data-genre=<name-of-genre>
    button.dataset.genre = genre.toLowerCase();
    button.addEventListener('click', () => toggleGenre(button));
    genreContainer.appendChild(button);
  });
}
function toggleGenre(button) {
  const genre = button.dataset.genre;
  button.classList.toggle('active');

  if (button.classList.contains('active')) {
    // Add genre
    activeGenres.push(genre);
  } else {
    // Remove genre
    activeGenres = activeGenres.filter((item) => item !== genre);
  }
  console.log('Activate[' + activeGenres + ']');
}

function generatorYears(START_YEAR = 2025, END_YEAR = 1950) {
  const yearSelect = document.getElementById('year-select');
  yearSelect.innerHTML = '<option value="">Select Year</option>';

  for (let year = START_YEAR; year >= END_YEAR; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

// Event
function addEventListeners() {
  document.getElementById('year-select').addEventListener('change', (e) => {
    selectYear = e.target.value;
    console.log(`select ${selectYear}`);
  });

  document.getElementById('season-select').addEventListener('change', (e) => {
    selectseason = e.target.value;
    console.log(`select ${selectseason}`);
  });
}

// Initialize
function initialize() {
  generatorYears();
  initializeGenres();
  addEventListeners();
}

initialize();
