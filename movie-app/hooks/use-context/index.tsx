"use client";

import {
  fetchGenres,
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
  genres: { id: number; name: string }[]; // Add genres to the context
  fetchFilteredMoviesFromContext: (filters: {
    with_genres?: string;
    primary_release_year?: string;
    vote_average_gte?: string;
    sort_by?: string;
  }) => void;
}
const MovieContext = createContext<MovieContextType>({
  topRated: [],
  popular: [],
  upcoming: [],
  nowPlaying: [],
  loading: true,
  movies: [],
  setMovies: () => {},
  isLoading: false,
  setIsLoading: () => {},
  genres: [], // Add genres to the context
  fetchFilteredMoviesFromContext: () => {},
});

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [top, pop, up, now,genre] = await Promise.all([
          fetchTopRatedMovies(),
          fetchPopularMovies(),
          fetchUpcomingMovies(),
          fetchNowPlayingMovies(),
          fetchGenres(),
        ]);

        setTopRated(top.results);
        setPopular(pop.results);
        setUpcoming(up.results);
        setNowPlaying(now.results); // Ensure cast is an array
        setGenres(genre.genres); // Set genres
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }; 
    fetchAll();
  }, []);

  const fetchFilteredMoviesFromContext = async (filters: {
    with_genres?: string;
    primary_release_year?: string;
    vote_average_gte?: string;
    sort_by?: string;
  }) => {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!TMDB_API_KEY) return;

    setIsLoading(true);
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      sort_by: filters.sort_by || "popularity.desc",
    });

    if (filters.with_genres && filters.with_genres.trim() !== "")
      params.append("with_genres", filters.with_genres);
    
    if (filters.primary_release_year)
      params.append("primary_release_year", filters.primary_release_year);
    if (filters.vote_average_gte)
      params.append("vote_average.gte", filters.vote_average_gte);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?${params.toString()}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Failed to fetch filtered movies", error);
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
        genres, // Provide genres to the context
        fetchFilteredMoviesFromContext,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
