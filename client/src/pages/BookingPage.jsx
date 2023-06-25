import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import PhotosGallery from "../PhotosGallery";
import {toDate, format} from 'date-fns'
import PlaceImg from '../PlaceImg';

export default function BookingPage() {
    const {id} = useParams();
    const [booking, setBooking] = useState();

    useEffect(()=>{
        if(!id) return;
        axios.get('/bookings').then(({data})=>{
            const foundBooking = data.find(({_id})=> _id===id)
            if(foundBooking) 
                setBooking(foundBooking)
        })
    }, [id])

    if(!booking) return '';

    return(
        <div className=" grid sm:grid-cols-1 lg:grid-cols-[2fr_1fr] lg:mx-40 mb-4">
            <div className="mx-1 lg:mx-4">
                <h2 className="text-xl font-semibold my-2">Your reservation is confirmed</h2>
                <h3>You are going to {booking.place.address}</h3>
                {/* <PhotosGallery place={booking.place}/> */}
                    <PlaceImg place={booking.place} className={'object-cover  my-4 shrink-0'}/>
                <h2 className="text-2xl font-semibold my-2">{booking.place.title}</h2>
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
                    href={"https://maps.google.com/?q=" + booking.place.address}
                    className="text-lg underline"
                    >
                    {booking.place.address}
                    </a>
                </div>
                <div className="flex items-center">
                    
                    <button className="primary mt-2"><Link to={'/place/'+booking.place._id}>
                        Show Details
                    </Link>
                    </button>
                </div>
            </div>
            <div className="mx-2 mt-6 lg:mt-16 pt-3">
                <div className="flex justify-between border-b-2 pb-2">
                    <div>
                        Check-In<br/>
                        {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
                    </div>
                    <div>
                        Check-Out<br />
                        {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                    </div>
                </div>
                <div className="flex justify-between border-b-2 pb-2">
                    Guests<br/>
                    {booking.guests}
                </div>
                <div className="flex justify-between border-b-2 pb-2">
                    Amount<br/>
                    Rs. {booking.price}
                </div>
            </div>
        </div>

    )
}