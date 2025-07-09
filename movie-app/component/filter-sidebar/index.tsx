// Updated FilterSidebar with fetch logic moved to context and single genre selection

"use client";

import { useMovieContext } from "@/hooks/use-context";
import { useEffect, useState } from "react";

export function FilterSidebar() {
  const {
    genres,
    setMovies,
    setIsLoading,
    popular,
    fetchFilteredMoviesFromContext,
  } = useMovieContext();

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [showAll, setShowAll] = useState(true);

  const handleGenreSelect = (id: number) => {
    setSelectedGenre((prev) => (prev === id ? null : id));
    setShowAll(false);
  };

  const handleShowAll = () => {
    setSelectedGenre(null);
    setReleaseYear("");
    setRating(0);
    setSortBy("popularity.desc");
    setShowAll(true);
    setMovies(popular);
  };

  useEffect(() => {
    if (showAll) return;

    const filters = {
      with_genres: selectedGenre ? selectedGenre.toString() : undefined,
      primary_release_year: releaseYear || undefined,
      vote_average_gte: rating ? rating.toString() : undefined,
      sort_by: sortBy,
    };

    fetchFilteredMoviesFromContext(filters);
  }, [selectedGenre, releaseYear, rating, sortBy]);

  return (
    <div className="space-y-6 text-sm">
      {/* Genres */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">Genres</h3>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAll}
              onChange={handleShowAll}
              className="accent-blue-600"
            />
            <span>All</span>
          </label>

          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="genre"
                checked={selectedGenre === genre.id}
                onChange={() => handleGenreSelect(genre.id)}
                className="accent-blue-600"
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Release Year */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">Release Year</h3>
        <input
          type="number"
          placeholder="e.g., 2024"
          value={releaseYear}
          onChange={(e) => {
            setReleaseYear(e.target.value);
            setShowAll(false);
          }}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Minimum Rating */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">Minimum Rating</h3>
        <input
          type="range"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => {
            setRating(Number(e.target.value));
            setShowAll(false);
          }}
          className="w-full"
        />
        <span className="text-sm text-gray-600">Min: {rating}</span>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setShowAll(false);
          }}
          className="w-full p-2 border rounded-md"
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="primary_release_date.desc">Release Date</option>
        </select>
      </div>
    </div>
  );
}
