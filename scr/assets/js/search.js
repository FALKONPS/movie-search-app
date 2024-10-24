// search.js

const GENRES = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 7, name: 'Mystery' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 36, name: 'Slice of Life' },
  { id: 30, name: 'Sports' },
  { id: 37, name: 'Supernatural' },
  { id: 41, name: 'Suspense' },
  { id: 13, name: 'Historical' },
  { id: 19, name: 'Music' },
  { id: 66, name: 'Mahou Shoujo' },
  { id: 18, name: 'Mecha' },
  { id: 40, name: 'Psychological' },
  { id: 23, name: 'School' },
  { id: 32, name: 'Vampire' },
  { id: 82, name: 'Urban Fantasy' },
  { id: 15, name: 'Kids' },
  { id: 43, name: 'Josei' },
  { id: 42, name: 'Seinen' },
  { id: 25, name: 'Shoujo' },
  { id: 27, name: 'Shounen' },
  { id: 20, name: 'Parody' },
  { id: 70, name: 'Performing Arts' },
  { id: 71, name: 'Pets' },
  { id: 38, name: 'Military' },
  { id: 29, name: 'Space' },
  { id: 11, name: 'Strategy Game' },
  { id: 76, name: 'Survival' },
  { id: 77, name: 'Team Sports' },
  { id: 78, name: 'Time Travel' },
  { id: 31, name: 'Super Power' },
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
  GENRES.forEach((genre) => {
    const button = document.createElement('button');
    button.textContent = genre.name;
    // data-genre=<name-of-genre>
    button.dataset.genre = genre.id;
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
