// Updated FilterSidebar to work with movieType (movie/tv) and dynamic release year keys

"use client";

import { useMovieContext } from "@/hooks/use-context";
import { useEffect, useState } from "react";

export function FilterSidebar() {
  const {
    genres,
    movieType,
    setSelectedGenre,
    selectedGenre,
    countries,
    originCountry,
    setOriginCountry,
    fetchFilteredMoviesFromContext,
  } = useMovieContext();

  const [releaseYear, setReleaseYear] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");

  useEffect(() => {
    const filters: Record<string, string | undefined> = {
      with_genres: selectedGenre || undefined,
      vote_average_gte: rating ? rating.toString() : undefined,
      sort_by: sortBy,
      with_origin_country: originCountry || undefined,
    };

    if (movieType === "movie") {
      filters.primary_release_year = releaseYear || undefined;
    } else {
      filters.first_air_date_year = releaseYear || undefined;
    }

    fetchFilteredMoviesFromContext(filters);
  }, [selectedGenre, releaseYear, rating, sortBy, originCountry, movieType]);

  return (
    <div className="space-y-6 text-sm">
      {/* Genres */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">Genres</h3>
        <div className="grid grid-cols-2 gap-2">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="genre"
                checked={selectedGenre === genre.id.toString()}
                onChange={() => setSelectedGenre(genre.id.toString())}
                className="accent-blue-600"
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Release Year */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">
          {movieType === "movie" ? "Release Year" : "First Air Year"}
        </h3>
        <input
          type="number"
          placeholder={movieType === "movie" ? "e.g., 2024" : "e.g., 2021"}
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
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
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-sm text-gray-600">Min: {rating}</span>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Top Rated</option>
          <option
            value={
              movieType === "movie"
                ? "primary_release_date.desc"
                : "first_air_date.desc"
            }
          >
            Release Date
          </option>
        </select>
      </div>

      {/* Country */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-800">Country</h3>
        <select
          value={originCountry}
          onChange={(e) => setOriginCountry(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
