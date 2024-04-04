import React from "react";
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
  } from "@iconscout/react-unicons";
import { formatLocaltime, iconURL } from "../services/WeatherServices";
function TemperatureDetails({weather:{temp,weather,feels_like,temp_min,temp_max,humidity,speed,sunrise,sunset,citytimezone}}){
    return(
        <div>
            <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
                <p>{weather[0].main}</p>
            </div>
            <div className="flex flex-row items-center justify-between text-white py-3">
                <img src={iconURL(weather[0].icon)} alt="Image" className="w-20" />
                <p className="text-5xl">{`${temp.toFixed()}°`}</p>
                <div className="flex flex-col space-y-2">
                    <div className="flex font-light text-sm items-center justify-center">
                       <UilTemperature size = {18} className="mr-1"/>
                       Real fell:
                       <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                       <UilTear size = {18} className="mr-1"/>
                        Humidity:
                       <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                       <UilWind size = {18} className="mr-1"/>
                       Wind:
                       <span className="font-medium ml-1">{`${speed.toFixed()}km/h`}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                <UilSun/>
                <p className="font-light">Rise:
                <span className="font-medium ml-1">{formatLocaltime(sunrise,citytimezone,"hh:mm a")}</span>
                </p>
                <p className="font-light">|</p>
                <UilSunset/>
                <p className="font-light">Set:
                <span className="font-medium ml-1">{formatLocaltime(sunset,citytimezone,"hh:mm a")}</span>
                </p>
                <p className="font-light">|</p>
                <UilSun/>
                <p className="font-light">High:
                <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
                </p>
                <p className="font-light">|</p>
                <UilSun/>
                <p className="font-light">Low:
                <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
                </p>
            </div>
        </div>
    )
}
export default TemperatureDetails;