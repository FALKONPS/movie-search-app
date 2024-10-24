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

const FILTER_DATA = {
  activeGenres: [],
  selectYear: 0,
  selectSeason: '',
  sortBy: '',
  keywordSearch: '',
};

const API_ENDPOINTS = {
  BASE: 'https://api.jikan.moe/v4',
  CURRENT_SEASON: '/seasons/now',
  SEASON: '/seasons', // /{year}/{season}
  SEARCH: '/anime',
  GENRES: '/genres',
};

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
    FILTER_DATA.activeGenres.push(genre);
  } else {
    // Remove genre
    FILTER_DATA.activeGenres = FILTER_DATA.activeGenres.filter(
      (item) => item !== genre
    );
  }
  console.log(`Activate ${FILTER_DATA.activeGenres}`);
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
function toggleFilter(e) {
  const filterContainer = document.querySelector('.filters-container');
  if (filterContainer.classList.contains('filter-visible')) {
    e.target.textContent = 'Show Filter';
  } else {
    e.target.textContent = 'Hide Filter';
  }
  filterContainer.classList.toggle('filter-visible');
}

// Event
function addEventListeners() {
  document.getElementById('input-search').addEventListener('input', (e) => {
    // query api
    FILTER_DATA.keywordSearch = e.target.value;
    console.log(e.target.value);
  });
  document
    .getElementById('show-filter-btn')
    .addEventListener('click', toggleFilter);
  document.getElementById('query-data-btn').addEventListener('click', (e) => {
    // query api
    console.log('query api');
  });
  document.getElementById('year-select').addEventListener('change', (e) => {
    FILTER_DATA.selectYear = e.target.value;
    console.log(`select ${FILTER_DATA.selectYear}`);
  });

  document.getElementById('season-select').addEventListener('change', (e) => {
    FILTER_DATA.selectSeason = e.target.value;
    console.log(`select ${FILTER_DATA.selectSeason}`);
  });

  document.getElementById('rest-btn').addEventListener('click', (e) => {
    document.querySelectorAll('.filter-options button').forEach((button) => {
      button.classList.remove('active');
    });
    document.getElementById('season-select').value = '';
    document.getElementById('year-select').value = '';
    FILTER_DATA.activeGenres = [];
    FILTER_DATA.selectYear = 0;
    FILTER_DATA.selectSeason = '';
    FILTER_DATA.sortBy = '';
  });
}

function toggleSort(button) {
  const sortButtons = document.querySelectorAll('#sort-filters button');
  sortButtons.forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
  FILTER_DATA.sortBy = button.dataset.sort;
  console.log(`FILTER_DATA.sortBy ${FILTER_DATA.sortBy}`);
}

function initializeSortButtons() {
  const sortButtons = document.querySelectorAll('#sort-filters button');
  sortButtons.forEach((button) => {
    button.addEventListener('click', () => toggleSort(button));
  });
}

// Initialize
function initialize() {
  initializeSortButtons();
  initializeGenres();
  generatorYears();
  addEventListeners();
}

initialize();
