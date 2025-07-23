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

export const fetchGenresForMedia = async (type: "movie" | "tv") => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`;

  const res = await fetch(url);
  return res.json();
};
export async function fetchTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated");
}

export async function fetchPopularMovies() {
  return fetchFromTMDB("/movie/popular");
}

export const fetchUpcomingMovies = async () => {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!TMDB_API_KEY) throw new Error("Missing TMDB API Key");
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  );

  if (!res.ok) throw new Error("Failed to fetch upcoming movies");

  return res.json();
};

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


export async function fetchMovies({
  mediaType = "movie",
  page = 1,
}: {
  mediaType?: "movie" | "tv";
  page?: number;
}) {
  const res = await fetch(
    `${BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function fetchSimilarMovies(id: string) {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch similar movies");
  return res.json();
}


