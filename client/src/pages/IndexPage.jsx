//display all places on index(Home) page

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([
        ...response.data
      ]);
    });
  }, []);
  return (
    <div className="lg:mx-20 mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {/* display all places */}
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/'+place._id} key={place._id}>
            <div className="flex bg-gray-200 rounded-xl">
              <Image
                src={place.photos?.[0]}
                className="rounded-xl aspect-square object-cover"
                alt=""
              />
            </div>
            <h3 className="font-semibold px-2 pt-1 text-md">
              {place.address}
            </h3>
            <h2 className="text-gray-600 text-md px-2 truncate">
              {place.title}
            </h2>
            <h2 className="px-2 pt-1 flex items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
              </svg>
              <b>{place.price}</b>
              <span className="pl-1 font-light">night</span>
            </h2>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
