import Carousel from "@/components/ui/Carousel";
import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  return (
    <>
      <div className="w-full pt-6 pb-12">
        <Carousel />
      </div>
    </>
  );
};

export default HomePage;
