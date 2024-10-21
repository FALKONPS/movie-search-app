# APIs
- [Jikan API](https://jikan.moe/)
- [Current Season API](https://api.jikan.moe/v4/seasons/now?sfw)
- [Ghibli Films API](https://ghibli-api.vercel.app/api/films)

## Jikan API Result
- [Jikan API Documentation](https://docs.api.jikan.moe/#section/Information/HTTP-Responses)

### Anime Data Structure

- **Each Anime** contains:
  - **mal_id**: Link to MyAnimeList.
  - **URL**: Link to MyAnimeList.

#### Images
- Three types of images are available for each anime in `.jpg` and `.webp` formats:
  - **Normal**
  - **Mid**
  - **Large**

#### Trailer
- **YouTube URL**: Link to the trailer.
- **Thumbnail**: Available at `images[image_url]`, representing the YouTube thumbnail.

#### Titles
- Available in two languages:
  - **English**: `"title"`
  - **Japanese**: `"title_japanese"`

#### Anime Details
- **Type**: `TV`
- **Source**: `Original`
- **Episodes**: `null`
- **Status**: `Currently Airing`
- **Airing**: `true`
- **Aired**:
  - **From**: `"2024-10-06T00:00:00+00:00"`
  - **To**: `null`
  - **Date Range**: `"Oct 6, 2024 to ?"`
  - **Duration**: `12 min`
- **Rating**: `PG - Children`
- **Score**: `null`
- **Scored By**: `null`
- **Rank**: `20656`
- **Popularity**: `20999`
- **Members**: `200`
- **Favorites**: `0`
- **Synopsis**: `Second season of Punirunes.`
- **Background**: None.
- **Season**: `Fall`
- **Year**: `2024`
- **Broadcast**:
  - **Day**: `Sundays`
  - **Time**: `09:15`
  - **Timezone**: `Asia/Tokyo`
  - **String**: `Sundays at 09:15 (JST)`
