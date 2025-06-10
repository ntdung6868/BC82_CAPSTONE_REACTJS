import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import MovieCard from "../movie-card/MovieCard";
import { listMovieApi } from "@/apis/movie";

const MovieList = ({ filterId }) => {
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => <MovieCard key={movie.maPhim} movie={movie} />)
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500">Không có phim nào trong danh mục này</div>
      )}
    </div>
  );
};

export default MovieList;
