import React from "react";

const MovieTrailer = ({ trailer }) => {
  console.log("🚀 ~ trailer:", trailer);

  // Function to convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // Handle different YouTube URL formats
    let videoId = "";

    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url; // Already in embed format
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const embedUrl = getEmbedUrl(trailer);

  return (
    <div className="w-full h-full">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
