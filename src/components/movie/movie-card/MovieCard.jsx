import { Button } from "@/components/ui/button";
import { TicketIcon, YoutubeIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieTrailer from "../movie-trailer/MovieTrailer";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <>
      <div className="w-full aspect-[2/3] flex flex-col gap-2 sm:gap-3">
        <div
          className="relative w-full h-full rounded-lg overflow-hidden group"
          onClick={() => navigate(`/movie-details/${movie.maPhim}`)}
        >
          <div className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 group-hover:opacity-100 bg-[rgba(0,0,0,0.5)] transition-all duration-300 p-2 sm:p-4">
            <Button
              variant="default"
              className="bg-[#F26B38] border-1 border-transparent cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 hover:border-1 hover:border-white transition-all duration-200 text-xs sm:text-sm md:text-base py-1 sm:py-2 px-2 sm:px-4"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movie-details/${movie.maPhim}`);
              }}
            >
              <TicketIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="ml-1 sm:ml-2">Mua vé</span>
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer transition-all duration-200 hover:bg-transparent hover:text-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-xs sm:text-sm md:text-base py-1 sm:py-2 px-2 sm:px-4"
              onClick={(e) => {
                e.stopPropagation();
                setShowTrailer(true);
              }}
            >
              <YoutubeIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="ml-1 sm:ml-2">Trailer</span>
            </Button>
          </div>
          <img src={movie.hinhAnh} alt={movie.biDanh} className="w-full h-full object-cover" />
        </div>
        <div className="cursor-pointer px-1" onClick={() => navigate(`/detail-movie/${movie.maPhim}`)}>
          <h3 className="font-bold line-clamp-2 text-sm sm:text-base md:text-lg leading-tight">{movie.tenPhim}</h3>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <MovieTrailer trailer={movie.trailer} />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
