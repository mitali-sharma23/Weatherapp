import React from "react";
import {  getCurrentDateTime} from "../services/WeatherServices";
function TimeLocation({ weather:{ citytimezone ,name, country }}){
    return( 
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-white text-xl font-extralight">
                    { getCurrentDateTime(citytimezone)}
                </p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-white text-3xl font-medium">
                    {`${name}, ${country}`}
                </p>
            </div>
        </div>
    )
}
export default TimeLocation;