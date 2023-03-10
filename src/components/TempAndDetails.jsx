import React from 'react'
import { 
        UilArrowUp,
        UilArrowDown,
        UilTemperature,
        UilSun,
        UilWind,
        UilTear,
        UilSunset
} from "@iconscout/react-unicons";
import { formatToLocalTime } from '../services/weatherServices';

function TempAndDetails({units, weather: {
    description,icon,temp,feels_like,temp_min,temp_max,humidity,speed,sunrise,sunset,timezone }
}) {
  return (
    <div>
        <div className='flex items-center justify-center text-xl text-cyan-200'>
            <p className='capitalize'>{description}</p>
        </div>
        <div className='flex text-white py-2 flex-row text-md items-center justify-around'> {/*logo temp and details */}
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" className='w-20' style={{filter: "drop-shadow(15px 15px 15px #666666)"}}/>
            <p className='text-5xl transition ease-out hover:scale-125 hover:text-cyan-400 cursor-pointer'>{Math.round(temp)}{`°${units==='metric'?'C':'F'}`}</p>
            <div className='flex flex-col items-center space-y-2'> {/* More details about weather*/}
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTemperature size={18}/>
                    Real feel : <span className='font-medium ml-1'> {Math.round(feels_like)}{`°${units==='metric'?'C':'F'}`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTear size={18}/>
                    Humidity : <span className='font-medium ml-1'>{humidity}%</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilWind size={18}/>
                    Wind : <span className='font-medium ml-1'> {speed} m/s</span>
                </div>
            </div>  {/*End of more details */}
        </div>      {/*End of logo temp and details container*/}

        <div className='flex flex-row font-medium items-center justify-between mx-2 my-2 text-white py-2 ' style={{"font-size":"1.7vh"}}>  {/*Sunrise Sunset High Low */}
            <div className="flex flex-col font-light items-center justify-center ">
                <UilSun size={18}/>
                <p className='ml-1'>Sunrise :</p> 
                <div className='font-medium mr-1 '>{formatToLocalTime(timezone,sunrise,"hh:mm a")}</div>
            </div>
            <div className="flex flex-col font-light items-center justify-center">
                <UilSunset size={18}/>
                <p className='ml-1'>Sunset :</p> 
                <div className='font-medium mr-1'>{formatToLocalTime(timezone,sunset,"hh:mm a")}</div>
            </div>
            <div className="flex flex-col font-light items-center justify-center">
                <UilArrowUp size={18}/>
                <p className='ml-1'>High :</p> 
                <div className='font-medium mr-1'>{Math.round(temp_max)}{`°${units==='metric'?'C':'F'}`}</div>
            </div>
            <div className="flex flex-col font-light items-center justify-center">
                <UilArrowDown size={18}/>
                <p className='ml-1'>Low :</p> 
                <div className='font-medium '>{Math.round(temp_min)}{`°${units==='metric'?'C':'F'}`}</div>
            </div>
        </div> {/*End of sunrise sunset high low*/}
    </div>
  )
}

export default TempAndDetails
