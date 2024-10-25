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
// ['popularity', 'score', 'rank']
const FILTER_DATA = {
  activeGenres: [],
  selectYear: 0,
  selectSeason: '',
  keyword: '',
  order_by: 'popularity',
  currentPage: 1,
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
function loadPage(e) {
  advancedSearch(
    FILTER_DATA.keyword,
    FILTER_DATA.order_by,
    FILTER_DATA.activeGenres,
    FILTER_DATA.currentPage,
    false
  );
}

// Event
function addEventListeners() {
  document.getElementById('input-search').addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      FILTER_DATA.keyword = e.target.value;
      console.log(e.target.value);
      advancedSearch(
        FILTER_DATA.keyword,
        FILTER_DATA.order_by,
        FILTER_DATA.activeGenres,
        FILTER_DATA.currentPage
      );
    }
    // query api
  });
  document
    .getElementById('show-filter-btn')
    .addEventListener('click', toggleFilter);
  document.getElementById('load-more-btn').addEventListener('click', loadPage);
  document.getElementById('query-data-btn').addEventListener('click', (e) => {
    // query api
    FILTER_DATA.keyword = document.getElementById('input-search').value;
    advancedSearch(
      FILTER_DATA.keyword,
      FILTER_DATA.order_by,
      FILTER_DATA.activeGenres,
      FILTER_DATA.currentPage
    );
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
    FILTER_DATA.order_by = '';
  });
}

function toggleSort(button) {
  const sortButtons = document.querySelectorAll('#sort-filters button');
  sortButtons.forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
  FILTER_DATA.order_by = button.dataset.sort;
  console.log(`FILTER_DATA.order_by ${FILTER_DATA.order_by}`);
}

function initializeSortButtons() {
  const sortButtons = document.querySelectorAll('#sort-filters button');
  sortButtons.forEach((button) => {
    button.addEventListener('click', () => toggleSort(button));
  });
}

function renderCards(item) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
 <div class="image">
  <div class="status-label">${item.score}</div>
  <img
  src="${item.imageUrl}"
  />
  <div class="card-content">
  <h3 class="title">${item.title}</h3>
  <hr />
  <div class="info">
  <span>${item.year}</span>
  <span class="separator">•</span>
  <span>${item.title}</span>
  <span class="separator">•</span>
  </div>
  </div>
  </div>
  `;
  document.getElementById('anime-search-grid').appendChild(card);
}

function advancedSearch(
  keyword = '',
  order_by = 'popularity',
  genres = [],
  page = 1,
  clear_old = true
) {
  let base = API_ENDPOINTS.BASE;
  let route = API_ENDPOINTS.SEARCH;
  const params = new URLSearchParams();
  route = API_ENDPOINTS.SEARCH + '?';
  if (clear_old) {
    FILTER_DATA.currentPage = 1;
    page = 1;
  }
  if (keyword) {
    params.append('q', keyword);
    console.log(
      `KEYBORAD : ${keyword} OREDER BY: ${order_by} : GEBRES ${genres} `
    );
  } else if (genres.length > 0) {
    let _genres = genres.join(',');
    params.append('genres', _genres);
  }
  if (page > 0) {
    params.append('page', page);
  }
  if (FILTER_DATA.order_by.includes(order_by)) {
    params.append('order_by', order_by);
  } else {
    params.append('order_by', 'popularity');
  }
  params.append('sfw', 'true');
  let url = `${base}${route}${params.toString()}`;
  console.log('Request URL:', url);

  FILTER_DATA.currentPage = FILTER_DATA.currentPage + 1;
  return fetch(url)
    .then((response) => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then((data) => {
      console.log('API Response:', data);
      return processAnimeData(data, clear_old);
    })
    .catch((error) => {
      console.error('Search error:', error);
      return handleError(error);
    });
}

// https://api.jikan.moe/v4/seasons/now
// https://api.jikan.moe/v4/seasons/{year}/{season}
// https://api.jikan.moe/v4/anime?q={name}
// https://api.jikan.moe/v4/genres/{genre}
// https://api.jikan.moe/v4/anime?order_by=popularity
// https://api.jikan.moe/v4/anime?order_by=score
// https://api.jikan.moe/v4/anime?order_by=rank
// https://api.jikan.moe/v4/top/anime?type=movie
// https://api.jikan.moe/v4/anime?genres=2
function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function handleError(error) {
  console.error('Error:', error);
  const animeGrid = document.getElementById('anime-grid');
  if (animeGrid) {
    animeGrid.innerHTML = `<div class="error">Error loading anime: ${error.message}</div>`;
  }
  throw error;
}

function processAnimeData(data, _clear = true) {
  const animeList = data.data.map((anime) => ({
    id: anime.mal_id || '',
    title: anime.title || '',
    englishTitle: anime.title_english || '',
    type: anime.type || '',
    episodes: anime.episodes || '',
    status: anime.status || '',
    score: anime.score || '',
    genres: anime.genres.map((g) => g.name) || '',
    synopsis: anime.synopsis || '',
    imageUrl: anime.images?.jpg?.large_image_url || null || '',
    year: anime.year || '',
    season: anime.season || '',
  }));
  if (_clear) {
    document.getElementById('anime-search-grid').innerHTML = '';
  }
  animeList.map((item) => renderCards(item));
}

// Initialize
function initialize() {
  initializeSortButtons();
  initializeGenres();
  generatorYears();
  addEventListeners();
}

initialize();
advancedSearch(
  FILTER_DATA.keyword,
  FILTER_DATA.order_by,
  FILTER_DATA.activeGenres,
  FILTER_DATA.currentPage
);
