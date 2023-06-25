import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { differenceInCalendarDays, startOfTomorrow, addDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";

const BookingCard = ({ place }) => {
  const {user} = useContext(UserContext);
  const [checkIn, setCheckIn] = useState(startOfTomorrow());
  const [checkOut, setCheckOut] = useState(addDays(startOfTomorrow(), 5));
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');

  useEffect(()=>{
    if(user) setName(user.name)
  }, [user]);

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookPlace = async()=>{
    
    const response = await axios.post('/bookings', {place:place._id, checkIn, checkOut, guests, name, phone, price:numberOfNights*place.price});

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`)
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  return (
    <>
      <div className="h-fit my-4 md:m-8 md:-mr-4 p-4 border border-gray-200 shadow-md shadow-gray-300 rounded-xl">
        <div className="rounded-xl flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
          </svg>
          <span className="font-semibold text-xl pr-1">{place.price}</span>per
          night
        </div>
        <div className="border border-gray-400 rounded-md mt-3">
          <div className="grid grid-cols-2 rounded-md">
            <div className=" p-2 text-sm font-medium">
              CHECK-IN <br />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                name=""
                id=""
              />
            </div>
            <div className="border-l border-gray-400 p-2 text-sm font-medium">
              CHECKOUT
              <br />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                name=""
                id=""
              />
            </div>
          </div>
          <div className="border-t border-gray-400 p-2 text-sm font-medium">
            GUESTS
            <br />
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2">
          <label>Your full name </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e)=>setName(e.target.value)}
          />
          <label>Phone No.</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <button onClick={bookPlace} className="primary mt-2">Reserve</button>
        <div className="mt-2 flex justify-center text-gray-500 ">
          You won't be charged yet
        </div>

        {numberOfNights > 0 && (
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-1 underline text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="#6b7284">
                
                <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
              </svg>
              {place.price} {" x "} {numberOfNights} nights
            </div>
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="#6b7284">
                
                <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
              </svg>
              {place.price*numberOfNights}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingCard;
