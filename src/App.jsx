
import './App.css'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Topbutton from './components/Topbuttons'
import Input from './components/Inputs'
import TimeLocation from './components/TimeLocation'
import TemperatureDetails from './components/TemperatureDetails'
import Forecast from './components/Forecast'
import { useEffect, useState } from 'react'
import formattedweather from './services/WeatherServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [location,setLocation] = useState("London");
  const [units,setUnits] = useState('metric');
  const [weather,setWeather] = useState(null);
  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  useEffect(()=>{
       const fetchWeather = async()=>{
        await formattedweather(location,latitude,longitude,units).then(data =>{ 
          toast.success(`Successfully fetched data for ${data.name},${data.country} `)
          setWeather(data)});
     }
        fetchWeather();
    }
  ,[location,units,latitude,longitude]);
   /*this function below  determines the background color gradient based on the weather temperature 
     and unit settings. If there's no weather information available, it sets a default blueish
     gradient. If there is weather information, it sets the gradient based on whether 
     the temperature is below or above a certain threshold.*/
  const formatbackground = ()=>{                                    
      if(!weather) return "from-cyan-700 to-blue-700"
       const threshold = units ==='metric'?20:60;
       if(weather.temp<=threshold) return "from-cyan-700 to-blue-700"
       return "from-yellow-700 to-orange-700";
  }
  return (
      <div className = {`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatbackground()}`}>
        <Topbutton setLocation = {setLocation} setLatitude={setLatitude} setLongitude={setLongitude}/>
        <Input setLocation = {setLocation} units = {units} setUnits = {setUnits}  setLatitude = {setLatitude}  setLongitude = {setLongitude}/>
        {weather&& (
          <div>
        <TimeLocation weather = {weather}/>
        <TemperatureDetails weather = {weather}/>
        <Forecast items = {weather.list}/>
        </div>
        )}
        <ToastContainer autoClose = {5000} theme='colored' newestOnTop = {true}/>
      </div>
  )
}

export default App
