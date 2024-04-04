import React from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Topbutton({setLocation,setLatitude,setLongitude}){
    const cities = [
        {
          id: 1,
          title: "London",
        },
        {
          id: 2,
          title: "Sydney",
        },
        {
          id: 3,
          title: "Tokyo",
        },
        {
          id: 4,
          title: "Singapore",
        },
        {
          id: 5,
          title: "Paris",
        },
      ];
    return(
       <div className="flex items-center justify-around my-6">
        {cities.map((city)=>(
            <button onClick = {()=> { toast.info(`Fetching weather for ${city.title}`),setLatitude(''), setLongitude(''), setLocation(city.title)}} className="text-white text-lg font-medium" key={city.id}>{city.title}</button>
        ))}
       </div>
    )
}
export default Topbutton;