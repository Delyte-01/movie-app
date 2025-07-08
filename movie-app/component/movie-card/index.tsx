"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Plus } from "lucide-react";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div
      className="group relative w-64 transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted border ">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://res.cloudinary.com/dk5mfu099/image/upload/v1751878804/663-6632137_poster-settings-emblem-hd-png-download_tgg2ml.jpg"
            }
            alt={movie.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            onLoad={() => setImageLoaded(true)}
          />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center space-x-2">
              <Button
                size="icon"
                className="bg-white/20 hover:bg-white/30 backdrop-blur"
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 backdrop-blur border-white/20"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rating Badge */}
          <Badge className="absolute top-2 right-2 bg-black/70 backdrop-blur">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </Badge>
        </div>
      </Link>

      {/* Movie Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
}
