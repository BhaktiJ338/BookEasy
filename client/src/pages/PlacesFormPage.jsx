import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNavPage from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = ()=>{
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInto] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(2748)
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    if(!id) return;
    axios.get('/places/'+id).then(response=>{
      const {data} = response;
      setTitle(data.title)
      setAddress(data.address)
      setDescription(data.description)
      setPhotos(data.photos)
      setPerks(data.perks)
      setExtraInto(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  }, [id]);

  async function savePlace(e){
    e.preventDefault();
    
    const placeData = {
      title, address, photos, 
      description, perks, extraInfo, 
      checkIn, checkOut, maxGuests, price
    };
    if(id){
      //update place
      await axios.put('/places', {id, ...placeData});
      setRedirect(true);
    }
    else{
      //add new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to={'/account/places'}/>
  }

    return(
        <div className="mx-auto lg:w-2/3 ">
          <AccountNavPage />
          <form onSubmit={savePlace}>
            <div className="mt-4">
              <label className="text-xl">Title</label>
            </div>
            <input
              type="text"
              placeholder=" Highlight what makes your place unique..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label className="text-xl">Address</label>
            <input
              type="text"
              placeholder="Where is your place located ?"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label className="text-xl">Photos </label><span className="text-sm"> (*Add at least 5 photos)</span>
            <p className="text-md text-gray-500">
              Use a mix of wide and detail shots to give potential guests a good
              sense of your space.
            </p>
            <PhotosUploader photos={photos} onChange={setPhotos}/>
            <div className="mt-4">
              <label className="text-xl">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <label className="text-xl">Perks</label>
            <p className="text-md text-gray-500">
              Select all the perks of your place
            </p>
            <Perks selected={perks} onChange={setPerks} />
            <div className="mt-4">
              <label className="text-xl">Extra-Info</label>
              <p className="text-md text-gray-500">House rules, etc.</p>
              <textarea
                value={extraInfo}
                onChange={(e) => setExtraInto(e.target.value)}
              />
            </div>
            <label className="text-xl">Check In & Check Out</label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3>Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div>
                <h3>Check out time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              <div>
                <h3>Max Guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  required
                />
              </div>
              <div>
                <h3>Price per night</h3>
                <div className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                </div>
              </div>
            </div>

            <button className="primary my-4">Save</button>
          </form>
        </div>
    )
}

export default PlacesFormPage;