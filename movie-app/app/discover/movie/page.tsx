"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FilterSidebar } from "@/component/filter-sidebar";
import { MovieGrid } from "@/component/movie-grid";

const MovieFilterPage = () => {

  const [showFilters, setShowFilters] = useState<boolean>(false);

  return (
    <div>
  
      <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-900">
        {/* Toggle for mobile */}
        <div className="md:hidden p-4">
          <Button
            onClick={() => setShowFilters((prev) => !prev)}
            className="w-full"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Sidebar */}
        <aside
          className={`w-full md:w-1/4 md:block px-4 py-6 bg-gray-100 border-r ${
            showFilters ? "block" : "hidden"
          }`}
        >
          <FilterSidebar />
        </aside>

        {/* Movie grid */}
        <main className="flex-1 p-4">
          <MovieGrid />
        </main>
      </div>
    </div>
  );
};

export default MovieFilterPage;
