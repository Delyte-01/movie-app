"use client";

import HeroSkeleton from "@/component/hero-skeleton";
import { MovieCarousel } from "@/component/movie-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import HeroSlider from "@/features/hero";
import { useMovieContext } from "@/hooks/use-context";
import React from "react";

const Home = () => {
  const { topRated, popular, upcoming, nowPlaying, loading} =
    useMovieContext();

  if (loading) {
    return (
      <main className="p-6 space-y-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </main>
    );
  }
  return (
    <div>
      <HeroSlider movies={popular.slice(0, 5)} />
      <div className="container px-4 space-y-12">
        {/* <HomePage /> */}
        <MovieCarousel
          title="Trending Now"
          movies={popular}
          mediaType="movie"
        />

        {/* <CategorySection title="Popular Movies" movies={trendingMovies} /> */}

        <MovieCarousel title="Top Rated" movies={topRated} mediaType="movie" />

        <MovieCarousel
          title="Now Playing"
          movies={nowPlaying}
          mediaType="movie"
        />

        <MovieCarousel title="Upcoming" movies={upcoming} mediaType="movie" />
      </div>
    </div>
  );
};

export default Home;
