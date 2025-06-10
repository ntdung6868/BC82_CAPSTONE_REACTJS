import MovieFilter from "@/components/movie/movie-filter/MovieFilter";
import MovieList from "@/components/movie/movie-list/MovieList";
import Carousel from "@/components/ui/Carousel";
import React, { useState } from "react";

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState("nowShowing");

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <>
      <div className="w-full pt-4 pb-8 lg:pt-6 lg:pb-12">
        <Carousel />
      </div>
      <div className="container mx-auto px-4 sm:px-[45px] md:px-4 lg:max-w-4xl xl:max-w-screen-xl">
        <div className="w-full pt-6 pb-12 px-4">
          <MovieFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          <MovieList filterId={activeFilter} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
