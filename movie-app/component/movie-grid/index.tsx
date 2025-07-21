"use client";
import { useMovieContext } from "@/hooks/use-context";
import { MovieCard } from "../movie-card";
import { Button } from "@/components/ui/button";

export function MovieGrid() {
  const { isLoading, movies, loadMoreMovies } = useMovieContext();

  if (isLoading || !movies || movies.length === 0)
    return <p>No movies found.</p>;

  const displayMovies = movies.length > 0 ? movies : null;

  if (!displayMovies || displayMovies.length === 0) {
    return <p className="text-center py-6 text-gray-500">No movies found.</p>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 h-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-col-1  md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayMovies &&
        displayMovies.slice(0, 16).map((movie) => (
          <div key={movie.id} className="mx-auto">
            <MovieCard movie={movie} />
          </div>
        ))}
      {displayMovies.length > 0 && (
        <Button
          onClick={() => loadMoreMovies()}
          disabled={isLoading}
          className="col-span-full mt-6 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
