import { useLocation } from "react-router-dom";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
function MovieOverview() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const image = queryParams.get("image");
  const title = queryParams.get("title");
  const overview = queryParams.get("overview");
  const vote = queryParams.get("vote");
  const date = queryParams.get("date");
  const language = queryParams.get("language");
  const percentage = Math.floor((vote / 10) * 100);
  return (
    <div className="relative text-white h-[600px] lg:h-[550px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-full bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${image}`}
          alt="Movie"
        />
        <div className="absolute w-full top-[30%] p-4 md:p-8">
          <div className="flex items-center">
            <p className="text-3xl text-white md:text-5xl font-bold p-4">
              {title}
            </p>
            <span className="text-3xl  mt-3 ml-4 text-red-800 hidden md:block">
              <BiSolidRightArrow />
            </span>
          </div>
          <div className="flex p-2 ml-2">
            <p className="text-green-600">{`${percentage}% Match`}</p>
            <p className="text-gray-400 ml-2">{date}</p>
            <p className="border text-gray-400 rounded ml-2 pl-1 pr-1 h-[100%] text-center flex items-center">
              {language}
            </p>
          </div>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 p-4">
            {overview}
          </p>
        </div>
      </div>
      <Link to="/">
        <button className="bg-red-700 p-4 ml-3 rounded-full flex items-center">
          <span className="text-white mr-1">
            <BiSolidLeftArrow />
          </span>
          Back to home
        </button>
      </Link>
    </div>
  );
}

export default MovieOverview;
