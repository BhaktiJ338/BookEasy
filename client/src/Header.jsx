import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";


const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="w-full bg-white flex items-center justify-between md:py-3 border-b-2 px-4 md:px-10">
      {/* logo  */}
      <Link to={"/"} className="flex items-center gap-1">
        <svg
          className="w-8 h-8 md:w-10 md:h-10 fill-primary"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z" />
        </svg>

        <span className="text-primary font-bold text-2xl">BookEasy</span>
      </Link>
      {/* header center  */}
      <div className="w-0 md:min-w-fit invisible md:visible flex items-center border border-gray-400 px-4 py-2 rounded-full gap-2 shadow-md">
        <div>Anywhere</div>
        <div className="h-7 border-l border-gray-400"></div>
        <div>Any week</div>
        <div className="h-7 border-l border-gray-400"></div>
        <div>Add quests</div>
        {/* search button  */}
        <button className="bg-primary hover:bg-primary_dark text-white rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* header end  */}
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center border border-gray-400 py-1 px-2 md:px-4 md:py-2 rounded-full gap-2"
      >
        {/* hamburger icon  */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {/* profile icon  */}
        <div className="bg-gray-500 rounded-full text-white p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div className="w-0 md:min-w-max invisible md:visible">{user.name}</div>}
      </Link>
    </header>
  );
};

export default Header;
