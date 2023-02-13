// import UilReact from '@iconscout/react-unicons/icons/uil-react'
import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeLocation from './components/TimeLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherServices';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query,setQuery] = useState({q:'lucknow'});
  const [units,setUnits] = useState('metric');
  const [weather,setWeather] = useState(null);

  useEffect(()=>{
    const getWeatherData = async()=>{

    
    const message = query.q? query.q : 'current location.';
    toast.info("Fetching weather for "+ message);   
    await getFormattedWeatherData({...query,units}).then((data)=>{setWeather(data)});
    }
    getWeatherData();

  },[query,units]);

  const formatBackground=()=>{
        if (!weather)   return "from-cyan-700 to-blue-700";
        const threshold = (units==='metric')?20:60;
        if(weather.temp <= threshold && weather.temp>threshold*0.6)    return "from-cyan-700 to-blue-700";
        else if(weather.temp <= threshold*0.6)  return "from-cyan-400 to-blue-400";
        else if(weather.temp > threshold && weather.temp<=threshold*1.5  )       return "from-orange-400 to-yellow-400"
        else    return "from-yellow-700 to-orange-700"
  }

  return (
    <div className ={`mx-auto max-w-screen-md py-2 px-10 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400 `}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
              <div>
                    <TimeLocation weather={weather}/>
                    <TempAndDetails weather={weather} units={units}/>
                    <Forecast title="Hourly" items={weather.hourly} units={units}/>
                    <Forecast title="Daily" items={weather.daily} units={units}/>
              </div>
      )}

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
     
    </div>
  );
}

export default App;
