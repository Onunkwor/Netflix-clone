import React, { useEffect, useState } from "react";
import request from "../Request";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);

  useEffect(() => {
    axios.get(request.requestPopular).then((response) => {
      setMovies(response.data.results);
      // Select a random movie when the component mounts
      const randomIndex = Math.floor(
        Math.random() * response.data.results.length
      );
      setCurrentMovie(response.data.results[randomIndex]);
    });
  }, []);

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  const truncatedOverview = currentMovie?.overview.slice(0, 150);
  const overviewToDisplay = showFullOverview
    ? currentMovie?.overview
    : truncatedOverview;

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${currentMovie?.backdrop_path}`}
          alt={currentMovie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {currentMovie?.title}
          </h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Release Date: {currentMovie?.release_date}
          </p>
          <p
            className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200"
            onClick={toggleOverview}
            style={{ cursor: "pointer" }}
          >
            {overviewToDisplay}
            {currentMovie?.overview.length > 150 && (
              <span className="text-blue-400 ml-2" onClick={toggleOverview}>
                {showFullOverview ? "Read Less" : "Read More"}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
