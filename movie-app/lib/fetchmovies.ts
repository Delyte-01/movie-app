const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  if (!res.ok) {
    console.error(`Error fetching ${endpoint}:`, res.status, await res.text());
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}
export async function fetchGenres() {
  return fetchFromTMDB("/genre/movie/list");

}
export async function fetchTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated");
}

export async function fetchPopularMovies() {
  return fetchFromTMDB("/movie/popular");
}

export async function fetchUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming");
}

export async function fetchNowPlayingMovies() {
  return fetchFromTMDB("/movie/now_playing");
}


export async function fetchMovieDetails(id: string) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export async function fetchMovieCast(id: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.cast;
  } catch (error) {
    console.error("Error fetching cast:", error);
    return [];
  }
}
  
export async function fetchSimilarMovies(movieId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch similar movies");
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
}

