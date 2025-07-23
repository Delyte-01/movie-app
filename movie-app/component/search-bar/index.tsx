// components/SearchBar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
// Optional hook for performance
import { useDebounce } from "@/hooks/use-context/useDebounce";
import Image from "next/image";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  poster_path: string | null;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300); // Optional debounce
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery.trim()) return;

      setLoading(true);
      const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${debouncedQuery}&api_key=${TMDB_API_KEY}`
      );
      const data = await res.json();
      const filteredResults = data.results?.filter(
        (item: SearchResult) =>
          item.media_type === "movie" || item.media_type === "tv"
      );
      setResults(filteredResults?.slice(0, 8) || []);
      // setResults(data.results?.slice(0, 8) || []);
      setLoading(false);
      setIsOpen(true);
    };

    if (debouncedQuery.length > 1) fetchSearchResults();
    else setResults([]);
    setLoading(false);
  }, [debouncedQuery]);

  const handleClickResult = (item: SearchResult) => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, TV shows..."
        autoFocus
        className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-500"
      />

      {isOpen && results.length > 0 && (
        <div
          ref={overlayRef}
          className="absolute left-0 right-0 mt-2 z-50 bg-white dark:bg-gray-900 border shadow-lg rounded-lg max-h-[300px] overflow-auto"
        >
          {results.map((item) => (
            <Link
              // key={item.id}
              // href={`/movie/${item.id}`}
              key={`${item.media_type}-${item.id}`}
              href={`/${item.media_type}/${item.id}`}
              onClick={() => handleClickResult(item)}
              className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <Image
                width={40}
                height={60}
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                    : "https://res.cloudinary.com/dk5mfu099/image/upload/v1751878804/663-6632137_poster-settings-emblem-hd-png-download_tgg2ml.jpg"
                }
                alt={item.title || item.name || ""}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium hover:underline">
                  {item.title || item.name}{" "}
                  <span className="text-xs text-muted-foreground">
                    ({item.media_type})
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {loading && (
        <div className="absolute right-4 top-3">
          <div className="w-5 h-5 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
