import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../FireBase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);
  const navigate = useNavigate();
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.poster_path,
          backdrop_path: item.backdrop_path,
          language: item.original_language,
          vote: item.vote_average,
          overview: item.overview,
          date:item.release_date
        }),
      });
      !like && toast.success("Added to likes");
    } else {
      toast.error(
        "To save a movie, please sign up or sign in to your account."
      );
    }
  };
  const displayErrorToast = () => {
    toast.error("Please SignUp/SignIn to see movie overview");
  };
  const navigateToOverview = () => {
    navigate(`/MovieOverview?image=${item.backdrop_path}&title=${item.title}&vote=${item.vote_average}&language=${item.original_language}&overview=${item.overview}&date=${item.release_date}`);
  };
  return (
    <div
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor relative p-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-full h-auto block "
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
        alt={item?.title}
      />

      <div
        className={`absolute top-0 left-0 w-full h-full hover:bg-black/50 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      onClick={user ? navigateToOverview : displayErrorToast}

      >
        <p
          className="text-xs md:text-sm flex items-center justify-center h-full text-center break-all text-white"
          style={{
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item?.title}
        </p>
      </div>

      {isHovered && (
        <p onClick={saveShow} className="absolute top-4 left-4 text-gray-300">
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
      )}
    </div>
  );
};

export default Movie;
