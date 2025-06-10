import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div>
      <img src={movie.hinhAnh} alt="" />
    </div>
  );
};

export default MovieCard;
