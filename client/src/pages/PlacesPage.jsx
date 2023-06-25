//Display all accommodations of user on his profile page
import { Link } from "react-router-dom";
import AccountNavPage from "../AccountNav";
import PlaceImg from '../PlaceImg';
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {

  const [places, setPlaces] = useState([]);
  
  useEffect(()=>{
    axios.get('/user-places').then(({data})=>{
      setPlaces(data)
    })
  }, []);

  return (
    <div>
      <AccountNavPage />
        <div className="text-center mt-6">
          <Link
            to={"/account/places/new"}
            className="inline-flex bg-primary text-white py-2 px-4 rounded-full gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
        <div >
          {places.length>0 && places.map(place=>(
            <Link to={"/account/places/"+place._id} className="flex items-center mt-4 text-lg">
              <div className="mx-auto w-full lg:w-2/3 md:flex items-center gap-4 p-4 shadow-md rounded-lg border">
                <PlaceImg place={place} className={"object-cover md:w-32 md:h-32 shrink-0"}/>
                <div className="text-lg shrink" >
                  <h2 className="text-lg shrink">{place.title}</h2>
                  <p className="text-gray-500 text-base shrink">{place.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
};

export default PlacesPage;
