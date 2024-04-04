import React, { useState } from "react";
import { UilSearch } from '@iconscout/react-unicons';
import { UilLocationPinAlt } from '@iconscout/react-unicons'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Input({setLocation,units,setUnits,setLatitude,setLongitude}){
    const [city,setCity] = useState('');
    const handlesearch = ()=>{
        if(city!==''){
          toast.info(`Fetching weather for ${city}`);
          setLatitude('');
          setLongitude('');
          setLocation(city);
        }
    }
    const handlelocation = ()=>{
         if(navigator.geolocation){
            toast.info("Fetching User's location");
            navigator.geolocation.getCurrentPosition((position)=>{
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setLatitude(lat);
                setLongitude(lon);
            })
         }
    }
    const handleunits = (e)=>{
        const selectedunit = e.currentTarget.name;
        if(units != selectedunit) setUnits(selectedunit);
    }
    return(
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input type="text"
                   value={city}
                   onChange={(e)=>setCity(e.target.value)}
                  placeholder="search for city..."
                  className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" />
                <UilSearch size={25} onClick = {handlesearch} className="text-white cursor-pointer transition ease-out hover:scale-125"/>
                <UilLocationPinAlt size = {25} onClick = {handlelocation} className="text-white cursor-pointer transition ease-out hover:scale-125"/>
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center">
                <button  name="metric" onClick={handleunits} className="text-xl text-white font-light transition ease-out hover:scale-125">
                 °C
                </button>
                <p className="text-xl text-white mx-1">|</p>
                <button name="imperial" onClick={handleunits} className="text-xl text-white font-light transition ease-out hover:scale-125">
                 °F
                </button>
            </div>
        </div>
    )
}
export default Input;