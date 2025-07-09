"use client";
import { useMovieContext } from "@/hooks/use-context";
import { MovieCard } from "../movie-card";

export function MovieGrid() {
  const { popular, isLoading, movies } = useMovieContext();

  if (!popular || popular.length === 0) return <p>No movies found.</p>;

  const displayMovies = movies.length > 0 ? movies : popular;

  if (isLoading) {
    return <p className="text-center py-6 text-gray-500">Loading movies...</p>;
  }

  if (!displayMovies || displayMovies.length === 0) {
    return <p className="text-center py-6 text-gray-500">No movies found.</p>;
  }

  return (
    <div className="grid grid-col-1  md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="mx-auto">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
