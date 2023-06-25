import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingCard from "../BookingCard";
import PhotosGallery from "../PhotosGallery";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "No such place";


  return (
    <div className="mt-2 lg:mt-6 lg:w-2/3 mx-auto">
      <h2 className="text-2xl font-semibold my-2">{place.title}</h2>
      <div className="flex items-center gap-1">
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        <a
          target="_blank"
          href={"https://maps.google.com/?q=" + place.address}
          className="text-lg underline"
        >
          {place.address}
        </a>
      </div>
      <PhotosGallery place={place}/>

      {/* extra info  */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
        <div>
          {/* description  */}
          <div className="text-lg my-4">
            <h2 className="text-base md:text-2xl font-semibold ">About this place</h2>
            {place.description}
          </div>
          <h2 className="text-2xl font-semibold lg:mt-4">Things to know</h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className="px-8 py-2 lg:p-2 border border-gray-300 rounded-xl grid grid-cols-[1fr_4fr] flex items-center">
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </div>
              <div className="text-lg">
                <span className="text-xl">Check-in</span> <br />
                {place.checkIn}
              </div>
            </div>
            <div className="px-8 py-2 lg:p-2 border border-gray-300 rounded-xl grid grid-cols-[1fr_4fr] flex items-center">
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-11 h-12 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </div>
              <div className="text-lg">
                <span className="text-xl">Check-out</span> <br />
                {place.checkOut}
              </div>
            </div>
            <div className="px-8 py-2 lg:p-2 border border-gray-300 rounded-xl grid grid-cols-[1fr_4fr] gap-1 flex items-center">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-12 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <div className="text-lg">
                <span className="text-xl">Max Guests</span> <br />
                {place.maxGuests}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Perks</h2>
          <div className="mt-2">
            {place.perks.map((perk) => (
              <li className="list-decimal" key={perk}>{perk}</li>
            ))}
          </div>
        </div>
        <BookingCard place={place} />
      </div>
      <div className="rounded-md bg-gray-100 p-4 mt-4 mb-6">
        <h2 className="text-2xl font-semibold ">Extra Info</h2>
        <div className="pt-2 text-gray-700">{place.extraInfo}</div>
      </div>
    </div>
  );
};

export default PlacePage;
