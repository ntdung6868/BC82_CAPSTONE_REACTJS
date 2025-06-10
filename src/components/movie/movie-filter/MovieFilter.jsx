import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MovieFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "nowShowing", label: "Phim đang chiếu" },
    { id: "comingSoon", label: "Phim sắp chiếu" },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          className={cn(
            "px-6 py-2 rounded-full transition-all duration-300 cursor-pointer",
            activeFilter === filter.id
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default MovieFilter;
