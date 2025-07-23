"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Info,
} from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/lib/types";
import { useMovieContext } from "@/hooks/use-context";
import HeroSkeleton from "@/component/hero-skeleton";

interface HeroSliderProps {
  movies: Movie[];
}

export default function HeroSlider({ movies }: HeroSliderProps) {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoading(false);
      },
      slides: { perView: 1 },
      // duration: 1000,
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 1000); // always show skeleton at least 1s
    return () => clearTimeout(timer);
  }, []);

  const fallbackImage =
    "https://res.cloudinary.com/dk5mfu099/image/upload/v1753282660/24a0b637f2177abc37d68c0998fd7211_jgjows.jpg";

  return (
    <div className="relative mb-10">
      {!imageLoaded ? (
        <HeroSkeleton />
      ) : (
        <>
          <div
            ref={sliderRef}
            className="keen-slider min-h-screen relative overflow-hidden"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="keen-slider__slide relative ">
                <div className="absolute inset-0">
                  <Image
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                        : fallbackImage
                    }
                    alt={movie.title}
                    quality={100} // increase quality
                    sizes="(max-width: 768px) 100vw, 100vw"
                    fill
                    className={`object-cover brightness-[0.85] sm:brightness-100 contrast-[1.1] hidden md:block ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    priority
                    placeholder="blur"
                    blurDataURL={fallbackImage}
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : fallbackImage
                    }
                    alt={movie.title}
                    quality={100} // increase quality
                    sizes="(max-width: 768px) 100vw, 100vw"
                    fill
                    className={`object-cover brightness-[0.85] sm:brightness-100 contrast-[1.1] block md:hidden ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    priority
                    placeholder="blur"
                    blurDataURL={fallbackImage}
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-26 text-white max-w-6xl animate-fade-in">
                  <div className="space-y-4">
                    {/* Movie Details */}
                    <div className="space-y-6">
                      {/* Title */}
                      <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-snug sm:leading-tight drop-shadow-md">
                        {movie.title}
                      </h1>

                      {/* Rating and Year */}
                      <div className="flex items-center flex-wrap gap-3 text-sm sm:text-base">
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
                        {movie?.genres?.slice(0, 3).map((genre) => (
                          <Badge
                            key={genre.id}
                            variant="secondary"
                            className="bg-background/40 backdrop-blur-sm text-sm"
                          >
                            {genre.name}
                          </Badge>
                        ))}
                      </div>

                      {/* Overview */}
                      <p className="text-base sm:text-lg leading-relaxed max-w-2xl line-clamp-4 sm:line-clamp-5 text-white/90 drop-shadow">
                        {movie.overview}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button
                          size="lg"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Play className="mr-2 h-5 w-5 fill-current" />
                          Watch Now
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="bg-white/10 backdrop-blur border-white/30 hover:bg-white/20"
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          Add to Watchlist
                        </Button>
                        <Button
                          size="lg"
                          variant="ghost"
                          className="hover:bg-white/10 text-white/90"
                        >
                          <Info className="mr-2 h-5 w-5" />
                          More Info
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {!loading && (
            <>
              <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {movies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
