import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import MovieCard from "../movie-card/MovieCard";
import { listMovieApi } from "@/apis/movie";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MovieList = ({ filterId }) => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["movieList", { maNhom: "GP02" }],
    queryFn: () => listMovieApi({ maNhom: "GP02" }),
    keepPreviousData: true,
  });

  const filteredMovies = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    switch (filterId) {
      case "nowShowing":
        return data.filter((movie) => movie.dangChieu);
      case "comingSoon":
        return data.filter((movie) => movie.sapChieu);
      default:
        return [];
    }
  }, [data, filterId]);

  const displayedMovies = filteredMovies.slice(0, 8);

  const handleShowMore = () => {
    if (filterId === "nowShowing") {
      navigate(`/phim-dang-chieu`);
    } else if (filterId === "comingSoon") {
      navigate(`/phim-sap-chieu`);
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => <MovieCard key={movie.maPhim} movie={movie} />)
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">Không có phim nào trong danh mục này</div>
        )}
      </div>
      <Button
        onClick={handleShowMore}
        variant="outline"
        className="px-8 py-2 border-[#F26B38] text-[#F26B38] hover:bg-[#F26B38] hover:text-white transition-all duration-200 cursor-pointer"
      >
        Xem thêm
      </Button>
    </div>
  );
};

export default MovieList;
