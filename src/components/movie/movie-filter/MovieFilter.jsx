import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MovieFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "nowShowing", label: "Đang chiếu" },
    { id: "comingSoon", label: "Sắp chiếu" },
    { id: "imax", label: "Phim IMAX" },
  ];

  return (
    <div className="flex flex-wrap gap-8 mb-8">
      <div class="hidden md:flex items-center">
        <span class="w-1 h-5 bg-[#034ea2] mr-2"></span>
        <h1 class="mr-6 text-xl font-bold uppercase">Phim</h1>
      </div>
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={cn(
            "relative font-bold text-[#333] opacity-50 py-1 cursor-pointer transition-colors duration-300 hover:text-[#8DABD0] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-current after:scale-x-0  after:transition-transform after:duration-300 after:ease-in-out",
            activeFilter === filter.id && "after:scale-x-100 opacity-100 text-[#034EA2] hover:text-[#034EA2]"
          )}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default MovieFilter;
