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

genre.sort((a, b) => a.length - b.length);

function addLabels() {
  // <span class="hint-label">Comedy</span>
  const hintsFilter = document.getElementById('hintsFilter');
  genre.forEach((item) => {
    let dateSpan = document.createElement('span');
    dateSpan.classList.add('hint-label');
    dateSpan.innerHTML = item;
    hintsFilter.append(dateSpan);
  });
}

async function fetchSearchData() {
  await fetch('https://api.jikan.moe/v4/anime')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data.data);
      animeData = data.data;
    });
}

fetchSearchData();
addLabels();
