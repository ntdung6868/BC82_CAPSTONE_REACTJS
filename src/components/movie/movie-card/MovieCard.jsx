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
      <div className="w-full aspect-[2/3] flex flex-col gap-3">
        <div
          className="relative w-full h-full rounded-lg overflow-hidden group"
          onClick={() => navigate(`/detail-movie/${movie.maPhim}`)}
        >
          <div className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 flex flex-col items-center justify-center gap-4 group-hover:opacity-100 bg-[rgba(0,0,0,0.5)] transition-all duration-300">
            <Button
              variant="default"
              className="bg-[#F26B38] border-1 border-transparent cursor-pointer w-1/3 hover:border-1 hover:border-white transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                // console.log("click mua ve");
                navigate(`/detail-movie/${movie.maPhim}`);
              }}
            >
              <TicketIcon />
              Mua vé
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer transition-all duration-200 hover:bg-transparent hover:text-white w-1/3"
              onClick={(e) => {
                e.stopPropagation();
                // console.log("click trailer");
                setShowTrailer(true);
              }}
            >
              <YoutubeIcon />
              Trailer
            </Button>
          </div>
          <img src={movie.hinhAnh} alt={movie.biDanh} className="w-full h-full object-cover" />
        </div>
        <div className="cursor-pointer" onClick={() => navigate(`/detail-movie/${movie.maPhim}`)}>
          <h3 className="font-bold line-clamp-2">{movie.tenPhim}</h3>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-3/4 aspect-video">
            <MovieTrailer trailer={movie.trailer} />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
