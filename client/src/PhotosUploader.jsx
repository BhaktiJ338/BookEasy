import axios from "axios";
import { useState } from "react";
import Image from "./Image"

const PhotosUploader = ({photos, onChange}) => {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/uploadByLink", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(e) {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deletePhoto(e, filename){
    e.preventDefault();
    onChange([...photos.filter((photo)=> photo!==filename)]);
  }

  function selectAsMainPhoto(e, filename){
    e.preventDefault();
    onChange([filename, ...photos.filter((photo)=>photo!==filename)])
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add by link E.g. myPlace.jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="rounded-xl px-1 py-2 bg-gray-200 hover:bg-gray-300 text-black mt-2 mb-4"
          onClick={addPhotoByLink}
        >
          {" "}
          Add&nbsp;Photo
        </button>
      </div>
      {/* upload button  */}
      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        <label className="h-32 cursor-pointer flex items-center justify-center border border-gray-300 rounded-2xl shadow-md bg-white hover:bg-gray-200 p-6 text-2xl text-black text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>

        {photos.length > 0 &&
          photos.map((link) => (
            <div className="flex h-32 relative" key={link}>
              <Image
                className=" w-full object-cover rounded-md hover:opacity-80"
                src={link}
              />
              {/* delete photo button  */}
              <button onClick={(e)=>deletePhoto(e,link)}  className="cursor-pointer absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              {/* select main photo button */}
              <button onClick={(e)=>selectAsMainPhoto(e, link)}  className="cursor-pointer absolute bottom-2 left-2 bg-black bg-opacity-50 rounded-md">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill={link===photos[0] ? "white":"none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default PhotosUploader;
