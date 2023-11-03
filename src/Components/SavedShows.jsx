import React, { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../FireBase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = UserAuth();
  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setMovies(doc.data()?.savedShows);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedId) => {
    try {
      const result = movies.filter((m) => m.id !== passedId);
      await updateDoc(movieRef, {
        savedShows: result,
      });
      toast.success("Removed from likes");
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdOutlineArrowBackIos
          onClick={slideLeft}
          size={30}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((item, id) => (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor relative p-2"
            >
              <img
                className="w-full h-auto block "
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div
                className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white "
                onClick={() => {
                  navigate(
                    `/MovieOverview?image=${item.backdrop_path}&title=${item.title}&vote=${item.vote}&language=${item.language}&overview=${item.overview}&date=${item.date}`
                  );
                }}
              >
                <p className="white-space-normal text-xs md:text-sm flex items-center justify-center h-full text-center">
                  {item?.title}
                </p>
              </div>
              {isHovered && (
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              )}
            </div>
          ))}
        </div>
        <MdOutlineArrowForwardIos
          onClick={slideRight}
          size={30}
          className="bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </div>
  );
};

export default SavedShows;
