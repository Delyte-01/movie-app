"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Share, Star, Clock, Calendar } from "lucide-react";

interface MovieDetailsProps {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  director: string;
  budget: number;
  revenue: number;
  tagline: string;
  trailer_url: string;
}

export function MovieDetails({
  id,
  title,
  overview,
  backdrop_path,
  poster_path,
  release_date,
  vote_average,
  runtime,
  genres,
  director,
  budget,
  revenue,
  tagline,
  trailer_url,
}: MovieDetailsProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative px-2 md:px-8 lg:px-14 text-white" key={id}>
      {/* Background */}
      <div
        className="absolute inset-0 h-[180vh] md:h-[70vh]"
        style={{
          backgroundImage: ` url(
            https://image.tmdb.org/t/p/original${backdrop_path}
          )`,
          backgroundSize: "cover",
          backgroundPosition: "left calc((50vw - 170px) - 340px) top",
          backgroundRepeat: "no-repeat",
        }}
      >
      
        {/* Dark overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-900/80" />
      </div>

      {/* Content */}
      <div className="relative pt-20 pb-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] max-w-sm mx-auto md:mx-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>

                {tagline && (
                  <p className="text-xl text-muted-foreground italic">
                    "{tagline}"
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatRuntime(runtime)}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                {/* Overview */}
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {overview}
                </p>

                {/* Director */}
                <div>
                  <span className="font-semibold">Directed by: </span>
                  <span className="text-muted-foreground">{director}</span>
                </div>

                {/* Box Office */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Budget: </span>
                    <span className="text-muted-foreground">
                      {formatCurrency(budget)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Revenue: </span>
                    <span className="text-muted-foreground">
                      {formatCurrency(revenue)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowTrailer(true)}
                >
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Watch Trailer
                </Button>
                <Button size="lg" variant="outline">
                  <Plus className="mr-2 h-5 w-5" />
                  Add to Watchlist
                </Button>
                <Button size="lg" variant="ghost">
                  <Share className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={trailer_url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
