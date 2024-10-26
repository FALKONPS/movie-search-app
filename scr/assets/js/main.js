const animeData = [
  {
    id: 1,
    title: 'One Piece',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/5/19082l.jpg',
    ageRating: 'PG-13',
    episodeCount: '999+ episodes',
    status: 'Ongoing',
    rating: 8.92,
    users: 22451,
    ranking: 42,
    tags: ['Action', 'Fantasy', 'Adventure'],
    quote: {
      text: "Everyone has things they can and cannot do... Leave his key to me. I'll do whatever you cannot do, and you do whatever I cannot do! Think carefully.",
      author: 'Sanji Chapter 414',
      title: 'Dreams Never Die!',
    },
  },
  {
    id: 2,
    title: 'Sousou no Frieren',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    ageRating: 'PG-13',
    episodeCount: '28 episodes',
    status: 'Finished Airing',
    rating: 9.32,
    users: 924616,
    ranking: 1,
    tags: ['Drama', 'Adventure', 'Fantasy'],
    quote: {
      text: 'Even the greatest heroes are forgotten someday.',
      author: 'Heiter',
      title: 'The Journey Continues',
    },
  },
  {
    id: 3,
    title: 'Gosick',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/11/27906.jpg',
    ageRating: 'PG-13',
    episodeCount: '24 episodes',
    status: 'Finished Airing',
    rating: 8.04,
    users: 565930,
    ranking: 598,
    tags: ['Action', 'Fantasy', 'Mystery'],
    quote: {
      text: 'Why was manservant Indian and the maid Arabian?',
      author: 'Victorique de Blois',
      title: 'Unveiling Mysteries',
    },
  },
  {
    id: 4,
    title: 'Shingeki no Kyojin',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    ageRating: 'R - 17+',
    episodeCount: '25 episodes',
    status: 'Finished Airing',
    rating: 8.55,
    users: 404550,
    ranking: 116,
    tags: ['Survival', 'Military', 'Action'],
    quote: {
      text: "If you begin to regret, you'll dull your future decisions and let others make your choices for you. All that's left for you then is to die. Nobody can foretell the outcome. Each decision you make holds meaning only by affecting your next decision.",
      author: 'Erwin Smith',
      title: 'My Soldiers, Fight!!!',
    },
  },
];

let currentIndex = 0;

function renderShowCard(anime) {
  return `
      <div class="show-card" data-id="${anime.id}">
        <div class="image-container">
          <img src="${anime.imageUrl}" alt="${
    anime.title
  } Cover" class="image" />
          <div class="age-rating">${anime.ageRating}</div>
        </div>
        <div class="content">
          <div class="status-section">
            <div class="episode-count">${anime.episodeCount}</div>
            <div class="status-badge">${anime.status}</div>
          </div>
          <h2 class="title">${anime.title}</h2>
          <div class="stats">
            <div class="rating">
              <span class="rating-star">★</span>
              <span>${anime.rating}</span>
            </div>
            <div>${anime.users.toLocaleString()} users</div>
            <div>#${anime.ranking} Ranking</div>
          </div>
          <div class="tags">
            ${anime.tags
              .slice(0, 2)
              .map((tag) => `<div class="tag">${tag}</div>`)
              .join('')}
            ${
              anime.tags.length > 2
                ? `<div class="tag">+${anime.tags.length - 2}</div>`
                : ''
            }
          </div>
        </div>
      </div>
    `;
}

function updateActiveCard() {
  const cards = document.querySelectorAll('.show-card');
  cards.forEach((card, index) => {
    if (index === currentIndex) {
      card.classList.add('active');
      card.classList.remove('inactive');
    } else {
      card.classList.remove('active');
      card.classList.add('inactive');
    }
  });
}

function updateQuote() {
  const heroContent = document.querySelector('.hero-content');
  heroContent.style.opacity = '0';

  setTimeout(() => {
    const currentAnime = animeData[currentIndex];
    heroContent.querySelector('h1').textContent = currentAnime.quote.title;
    heroContent.querySelector(
      'p'
    ).innerHTML = `"${currentAnime.quote.text}"<br>- ${currentAnime.quote.author}`;
    heroContent.style.opacity = '1';
  }, 300);
}

function rotateCards() {
  currentIndex = (currentIndex + 1) % animeData.length;
  updateActiveCard();
  updateQuote();
}

function initialize() {
  const container = document.querySelector('.shows-container');
  animeData.forEach((anime) => {
    container.innerHTML += renderShowCard(anime);
  });

  updateActiveCard();
  updateQuote();
  setInterval(rotateCards, 5000);
}

document.addEventListener('DOMContentLoaded', initialize);
