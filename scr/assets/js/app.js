// app.js

const API_ENDPOINTS = {
  BASE: 'https://api.jikan.moe/v4',
  CURRENT_SEASON: '/seasons/now',
  SEASON: '/seasons', // /{year}/{season}
};
function getCurrentSeasonAnime() {
  return fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.CURRENT_SEASON}?sfw=true`)
    .then(handleResponse)
    .then(processAnimeData)
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

console.log(getCurrentSeasonAnime());
