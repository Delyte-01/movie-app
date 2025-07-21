"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface CastSliderProps {
  cast: CastMember[];
}

export function CastSlider({ cast }: CastSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cast</h2>
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
      >
        {cast.map((member,i) => (
          <div key={i} className="flex-none w-32 text-center">
            <div className="relative aspect-[2/3] w-full mb-2 overflow-hidden rounded-lg bg-muted">
              <Image
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                    : "https://res.cloudinary.com/dk5mfu099/image/upload/v1751878804/663-6632137_poster-settings-emblem-hd-png-download_tgg2ml.jpg"
                }
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-sm line-clamp-2">
              {member.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {member.character}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
