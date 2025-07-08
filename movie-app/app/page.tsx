"use client";

import { MovieCarousel } from "@/component/movie-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroSection } from "@/features/hero";
import { useMovieContext } from "@/hooks/use-context";
import React from "react";

// Mock data - in a real app, this would come from an API
const featuredMovie = {
  id: 1,
  title: "Dune: Part Two",
  overview:
    "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
  backdrop_path: "/placeholder.svg?height=800&width=1400",
  poster_path: "/placeholder.svg?height=600&width=400",
  release_date: "2024-03-01",
  vote_average: 8.8,
  genres: ["Science Fiction", "Adventure", "Drama"],
};



const Home = () => {
  const { topRated, popular, upcoming, nowPlaying, loading } =
    useMovieContext();

    if (loading) {
      return (
        <main className="p-6 space-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i}  />
          ))}
        </main>
      );
    }
  return (
    <div
    // className='px-4 md:px-8 lg:px-16 xl:px-24 '
    >
      <HeroSection movie={featuredMovie} />

      <div className="container px-4 space-y-12">
        {/* <HomePage /> */}
        <MovieCarousel title="Trending Now" movies={popular} />

        {/* <CategorySection title="Popular Movies" movies={trendingMovies} /> */}

        <MovieCarousel title="Top Rated" movies={topRated} />

        <MovieCarousel title="Now Playing" movies={nowPlaying} />

        <MovieCarousel title="Upcoming" movies={upcoming} />
      </div>
    </div>
  );
};

export default Home;
