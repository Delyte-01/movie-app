"use client";

import { fetchMovieCast, fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "@/lib/fetchmovies";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};
  
interface MovieContextType {
  topRated: Movie[];
  popular: Movie[];
  upcoming: Movie[];
  nowPlaying: Movie[];
    loading: boolean;

}
const MovieContext = createContext<MovieContextType>({
  topRated: [],
  popular: [],
  upcoming: [],
  nowPlaying: [],
    loading: true,

});

export const MovieProvider = ({ children }: { children: ReactNode }) =>
{ 
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
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
              setNowPlaying(now.results);// Ensure cast is an array
          } catch (error) {
            console.error("Error fetching movies:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchAll();      
    }, []);
    
    return (
      <MovieContext.Provider
        value={{
          topRated,
          popular,
          upcoming,
          nowPlaying,
        loading,
        }}
      >
        {children}
      </MovieContext.Provider>
    );
}

export const useMovieContext = () => useContext(MovieContext);