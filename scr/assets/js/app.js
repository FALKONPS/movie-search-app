// app.js

const API_ENDPOINTS = {
  BASE: 'https://api.jikan.moe/v4',
  CURRENT_SEASON: '/seasons/now',
  SEASON: '/seasons', // /{year}/{season}
};

let movieAnimeItems = [];
let seasonAnimeItems = [];

function getCurrentSeasonAnime() {
  return fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.CURRENT_SEASON}?sfw=true`)
    .then(handleResponse)
    .then(processAnimeData)
    .then((item) => {
      const container = document.getElementById('anime-grid');
      container.innerHTML = '';
      seasonAnimeItems = item;
      item.forEach((item) => {
        container.appendChild(createCard(item));
      });
      setupMovement('anime-grid');
    })
    .catch(handleError);
}
function getMoiveAnime() {
  return fetch(`${API_ENDPOINTS.BASE}/anime?type=movie&order_by=popularity`)
    .then(handleResponse)
    .then(processAnimeData)
    .then((item) => {
      const container = document.getElementById('anime-moive-grid');
      container.innerHTML = '';
      movieAnimeItems = item;

      item.forEach((item) => {
        container.appendChild(createCard(item));
      });
      setupMovement();
    })
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function handleError(error) {
  console.error('Error:', error);
  throw error;
}

function processAnimeData(data) {
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
  return animeList;
}
function renderInitialCards() {}
function createCard(item) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="image">
      <div class="status-label">${item.score}</div>
      <img src="${item.imageUrl}" />
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
  return card;
}

function setupMovement(name = 'anime-moive-grid') {
  const container = document.getElementById(name);
  const leftArrow = container.closest('section').querySelector('.arrow.left');
  const rightArrow = container.closest('section').querySelector('.arrow.right');

  let currentPosition = 0;
  const cardWidth = 250 + 16; // Width + gap
  const visibleCards = Math.floor(container.offsetWidth / cardWidth);
  let animeList = movieAnimeItems;

  if (name == 'anime-grid') {
    animeList = seasonAnimeItems;
  }

  function updateArrowState() {
    // Disable if at the start
    leftArrow.disabled = currentPosition === 0;

    // Disable if at the end
    rightArrow.disabled =
      currentPosition <= -(cardWidth * (animeList.length - visibleCards));
  }

  function moveLeft() {
    if (currentPosition < 0) {
      currentPosition += cardWidth;
      if (currentPosition > 0) {
        currentPosition = 0;
      }
      container.style.transform = `translateX(${currentPosition}px)`;
      updateArrowState();
    }
  }

  function moveRight() {
    if (currentPosition > -(cardWidth * (animeList.length - visibleCards))) {
      currentPosition -= cardWidth;
      if (currentPosition < -(cardWidth * (animeList.length - visibleCards))) {
        currentPosition = -(cardWidth * (animeList.length - visibleCards)); // Reset to the end
      }
      container.style.transform = `translateX(${currentPosition}px)`;
      updateArrowState();
    }
  }

  leftArrow.addEventListener('click', moveLeft);
  rightArrow.addEventListener('click', moveRight);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
  });
  updateArrowState();
}

function initialize() {
  // getCurrentSeasonAnime();
  getCurrentSeasonAnime();
  getMoiveAnime();
}
document.addEventListener('DOMContentLoaded', initialize);
