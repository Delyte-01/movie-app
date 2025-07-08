"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Info, Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: string[];
}

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden   w-full mb-5 px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 border w-full">
        <Image
          src="https://res.cloudinary.com/dk5mfu099/image/upload/v1751880723/gFv5ZYb9TG5p42hOnP2cNtHYwOg_pyruph.jpg"
          alt={movie.title}
          fill
          className={`object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoad={() => setImageLoaded(true)}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2f2d28] via-[#2f2d28] to-transparent " />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2f2d28] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center text-white">
        <div className="container px-4">
          <div className="max-w-2xl space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {movie.title}
            </h1>

            {/* Rating and Year */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="bg-background/50 backdrop-blur"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Overview */}
            <p className="text-lg  leading-relaxed max-w-xl">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background/20 backdrop-blur border-white/20 hover:bg-background/30"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add to Watchlist
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="hover:bg-background/20"
              >
                <Info className="mr-2 h-5 w-5" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
