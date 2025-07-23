// Updated MovieContext to support dynamic genre fetching based on movieType (movie or tv)

"use client";

import {
  fetchGenresForMedia,
  fetchMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "@/lib/fetchmovies";
import { Movie } from "@/lib/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface CountryOption {
  code: string;
  name: string;
}

interface MovieContextType {
  topRated: Movie[];
  popular: Movie[];
  upcoming: Movie[];
  nowPlaying: Movie[];
  loading: boolean;
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  genres: { id: number; name: string }[];
 
  fetchFilteredMoviesFromContext: (filters: {
    with_genres?: string;
    primary_release_year?: string;
    first_air_date_year?: string;
    vote_average_gte?: string;
    sort_by?: string;
    with_origin_country?: string;
    page?: string;
  }) => void;
  movieType: "movie" | "tv";
  setMovieType: (type: "movie" | "tv") => void;
  originCountry: string;
  setOriginCountry: (country: string) => void;
  countries: CountryOption[];
  selectedGenre: string;
  setSelectedGenre: (genreId: string) => void;
  loadMoreMovies: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Movie[];
  setSearchResults: (results: Movie[]) => void;
  performSearch: (query: string) => void;
}

const MovieContext = createContext<MovieContextType>({
  topRated: [],
  popular: [],
  upcoming: [],
  nowPlaying: [],
  loading: true,
  movies: [],
  setMovies: () => { },
  isLoading: false,
  setIsLoading: () => { },
  genres: [],
  fetchFilteredMoviesFromContext: () => { },
  setMovieType: () => { },
  setOriginCountry: () => { },
  movieType: "movie",
  originCountry: "",
  countries: [],
  selectedGenre: "",
  setSelectedGenre: () => { },
  loadMoreMovies: () => { },
  searchQuery: "",
  setSearchQuery: () => { },
  setSearchResults: () => { },
  performSearch: () => { },
  searchResults: []
});

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number>(1); // Add this state
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [movieType, setMovieType] = useState<"movie" | "tv">("movie");
  const [originCountry, setOriginCountry] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  // const [page, setPage] = useState(1);

  const countries: CountryOption[] = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "IN", name: "India" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "NG", name: "Nigeria" },
  ];

  useEffect(() => {
    if (pathname.startsWith("/discover/tv")) {
      setMovieType("tv");
    } else {
      setMovieType("movie");
    }
  }, [pathname]);

  useEffect(() => {
    const updateGenres = async () => {
      if (movieType) {
        const genreRes = await fetchGenresForMedia(movieType); // now dynamic by media type
        if (genreRes?.genres) setGenres(genreRes.genres);
      }
    };
    updateGenres();
  }, [movieType]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [top, pop, up, now] = await Promise.all([
          fetchTopRatedMovies(),
          fetchPopularMovies(),
          fetchUpcomingMovies(),
          fetchNowPlayingMovies(),
        ]);

        setTopRated(top.results);
        setPopular(pop.results);
        setUpcoming(up.results);
        setNowPlaying(now.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies({ mediaType: movieType });
        setMovies(Array.isArray(data.results) ? data.results : []);
        setCurrentPage(1); // reset page on type switch
      } catch (error) {
        console.error("Failed to fetch default movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [movieType]);

  const fetchFilteredMoviesFromContext = async (filters: {
    with_genres?: string;
    primary_release_year?: string;
    first_air_date_year?: string;
    vote_average_gte?: string;
    sort_by?: string;
    with_origin_country?: string;
    page?: string;
  }) => {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!TMDB_API_KEY) return;

    

    try
    {
      setIsLoading(true);
      const params = new URLSearchParams({
        api_key: TMDB_API_KEY,
        sort_by: filters.sort_by || "popularity.desc",
        page: filters.page || "1",
      });

      if (filters.with_genres)
        params.append("with_genres", filters.with_genres);
      if (filters.vote_average_gte)
        params.append("vote_average.gte", filters.vote_average_gte);
      if (filters.with_origin_country)
        params.append("with_origin_country", filters.with_origin_country);

      if (movieType === "movie" && filters.primary_release_year)
        params.append("primary_release_year", filters.primary_release_year);

      if (movieType === "tv" && filters.first_air_date_year)
        params.append("first_air_date_year", filters.first_air_date_year);

      const res = await fetch(
        `https://api.themoviedb.org/3/discover/${movieType}?${params.toString()}`
      );
      const data = await res.json();

      if (Array.isArray(data.results)) {
        const tagged = data.results.map((item: any) => ({
          ...item,
          media_type: movieType,
        }));
        setMovies(tagged);
        setCurrentPage(parseInt(filters.page || "1"));
      }
    } catch (error) {
      console.error("Failed to fetch filtered movies", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMovies = () =>
  {
    setIsLoading(true);
    fetchFilteredMoviesFromContext({
      with_genres: selectedGenre || undefined,
      with_origin_country: originCountry || undefined,
      page: (currentPage + 1).toString(),
    });
    setIsLoading(false);
  };


  const performSearch = async (query: string) => {
    if (!TMDB_API_KEY || !query) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${movieType}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <MovieContext.Provider
      value={{
        topRated,
        popular,
        upcoming,
        nowPlaying,
        loading,
        movies,
        setMovies,
        isLoading,
        setIsLoading,
        genres,
        fetchFilteredMoviesFromContext,
        movieType,
        setMovieType,
        originCountry,
        setOriginCountry,
        countries,
        selectedGenre,
        setSelectedGenre,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        performSearch,
        loadMoreMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
