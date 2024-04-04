 import { DateTime } from "luxon";      //luxon api uesd for date and time management
 const API_KEY = "a6664207796ec64d48ecb16477221445";
 const Base_URL = "https://api.openweathermap.org/data/2.5";
 const Getcoord = async (location)=>{       //this func is uesd to fetch data based on location you provide
  return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`).then((res)=>res.json());
 }
 const formattedcoord = (data)=>{   //this func is used to get lat,lon and timezone of above fetched data
  const{                            // this function is uesd to format data return by getcoord fun
    results
   } = data;
   const {latitude,longitude,timezone} = results[0];
  const lat = latitude;
  const lon = longitude;
  return {lat,lon,timezone};
 }
 const Getweather = async (infotype, latlon,setunit)=>{            //this function is used to fetch data from lat,lon 
   const url = new URL(Base_URL + "/" + infotype);
   url.search = new URLSearchParams({...latlon,...setunit, appid:API_KEY});
   return  fetch(url).then((res)=>res.json());
 }
 const formatcurrentweather = (data)=>{            //this function is uesd to format data return by getweather func
      const { 
        coord:{lat,lon} ,                                    // here object destructuring is used
         weather,
         main:{temp,feels_like,temp_min,temp_max,humidity},
         wind:{speed},
         name,
         dt,
         sys:{country,sunrise,sunset},
         timezone
      } = data;
      return {lat,lon, weather,temp,feels_like,temp_max,temp_min,humidity,speed,name,dt,country,sunrise,sunset,timezone}
 }
   const formattedforecast = async(data1)=>{          //this function is used to handle  hourly forecast data
     let { city,list} = data1;    //here object destructuring is used
     list = list.slice(0,4).map( (d)=> {
           let title = DateTime.fromFormat(d.dt_txt,"yyyy-MM-dd HH:mm:ss")
            let formattedtitle = title.toFormat("dd MMM yyyy hh:mm a")
          return{
            title:  formattedtitle,
            temp: d.main.temp,
            icon: d.weather[0].icon
          };
        });
     return{ city,list};
 }
 const formattedweather =  async(location,latitude,longitude,units)=>{        //this function return formatted data and also hourly data
          if(latitude !=='' && longitude!== ''){                              // this is main func
            const latlon = {
              lat:latitude,
              lon:longitude
            }
            const setunit = {
              units:units
            }
            const formatweather = await Getweather("weather",latlon,setunit).then((data)=>formatcurrentweather(data));
            const {lat,lon} = formatweather;
            const formatforecast = await Getweather("forecast",{
             lat,
             lon,
             units:setunit.units
           }).then((data1)=>formattedforecast(data1));
           return {...formatweather, ...formatforecast};
          }
          else{
          const formatcoord = await Getcoord(location).then((data)=>formattedcoord(data));
          const {lat,lon} = formatcoord;
          const {timezone} = formatcoord;
          const latlon = {lat:lat,
                          lon:lon
           }
           const citytimezone = timezone;
           const setunit = {
            units:units
          }
          const formatweather = await Getweather("weather",latlon,setunit).then((data)=>formatcurrentweather(data));
          const formatforecast = await Getweather("forecast",{
          lat,
          lon,
          units:setunit.units
      }).then((data1)=>formattedforecast(data1));
      return {...formatweather, ...formatforecast,citytimezone};
        }
      }
 const formatLocaltime = (timestamp,timezone,formatstring)=>{               //convert timestamp to duration
   return DateTime.fromSeconds(timestamp,{zone:timezone}).toFormat(formatstring);
 }  
 export default formattedweather;
 const iconURL = (iconid) => `http://openweathermap.org/img/wn/${iconid}@2x.png`; //this func is used to return image acc to iconid
 export {formatLocaltime,getCurrentDateTime, iconURL };

 function getCurrentDateTime(citytimezone) {                   //this function is used to manage date and time using luxon
  let currentDateTime = DateTime.local().setZone(citytimezone);
   currentDateTime = currentDateTime.toFormat("cccc, dd MMM yyyy' | Local time:' hh:mm a");
   return currentDateTime;
}