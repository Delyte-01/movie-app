"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
// import { MovieCard } from "@/components/movie-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "../movie-card";
import { useMovieContext } from "@/hooks/use-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@/lib/types";


interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  mediaType: "movie" | "tv";
}

export function MovieCarousel({ title, movies, mediaType}: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { loading } = useMovieContext();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
 
  if (!movies || movies.length === 0) {
    return (
      <section className="space-y-4 px-4 md:px-8 lg:px-16 xl:px-24 h-50  mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">No {title} found.</p>
      </section>
    );
  }
  {
    !movies && (
      <p className="text-center text-gray-500 mt-2 ">No {title} found.</p>
    );
  }


  return (
    <section className="space-y-4 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="hidden md:flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="flex-none">
            {loading && index < 4 ? (
              <Skeleton className="w-64 rounded-sm" />
            ) : (
              <MovieCard movie={movie} mediaType={mediaType} />
            )}
          </div>
        ))}
      </div>
      
    </section>
  );
}
