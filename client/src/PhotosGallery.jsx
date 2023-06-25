import { useState } from "react";
import PlaceImg from "./PlaceImg";
import Image from "./Image";


const PhotosGallery = ({place})=>{
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
          <div className="absolute bg-white inset-0 min-h-max">
            <div className="p-8 grid gap-4">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="fixed flex justify-center items-center bg-gray-100 hover:bg-gray-200 w-9 h-9 shadow-md rounded-full"
              >
                {/* back button  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {place.photos.map((photo) => (
                <>
                  <div className="mx-auto lg:w-2/3 w-full ">
                    <Image
                      src={photo}
                      className="mx-auto"
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        );
      }
    return(
        <div className="mt-4 relative bg-white">
        <div onClick={() => setShowAllPhotos(true)} className="grid gap-1 md:gap-2 grid-rows-[2fr_1fr_1fr] md:grid-rows-none max-h-fit md:grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden bg-gray">
          <div className="grid-cols-1 md:grid-cols-none">
            <PlaceImg place={place} className={"cursor-pointer h-full object-cover aspect-square"} index={0}/>
          </div>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-none">
            <PlaceImg  place={place} className={"cursor-pointer object-cover aspect-square md:mb-1"} index={1}/>
            <PlaceImg place={place} className={"cursor-pointer object-cover aspect-square "} index={2}/>
          </div>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-none">
            <PlaceImg place={place} className={"cursor-pointer object-cover aspect-square md:mb-1"} index={3}/>
            <PlaceImg place={place} className={"cursor-pointer object-cover aspect-square"} index={4}/>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute right-2 bottom-2 bg-white py-1 px-3 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="text-sm md:text-base">Show all photos</span>
        </button>
      </div>
    )

}
export default PhotosGallery