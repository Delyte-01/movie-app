// lib/fetchtv.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTVDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error(`Failed to fetch TV details: ${res.status}`);
  return res.json();
}


export async function fetchTVCast(id: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Failed to fetch TV cast");
    const data = await res.json();
    return data.cast?.slice(0, 20); // limit to top 20
  } catch (error) {
    console.error("fetchTVCast error:", error);
    return [];
  }
}

export async function fetchSimilarTVShows(id: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) throw new Error("Failed to fetch similar TV shows");
    return res.json();
  } catch (error) {
    console.error("fetchSimilarTVShows error:", error);
    return { results: [] };
  }
}

export async function fetchTVVideos(tvId: String) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch TV videos");
  }

  const data = await res.json();
  const trailer = data.results.find(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );
 return trailer?.key;
}
