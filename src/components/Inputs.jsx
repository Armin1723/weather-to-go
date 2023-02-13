import {useState,React} from 'react'
import { UilLocationPoint, UilSearch } from '@iconscout/react-unicons'

function Inputs({setQuery,units,setUnits}) {

  const handleLocationClick=()=>{
      if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition((position)=>{
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
         setQuery({lat,lon});
         setCity('');
       });   
      }
  };
  const [city,setCity]= useState('');

  const handleUnitChange=(e) =>{
    const selectedUnit = e.currentTarget.name;
    if(units!== selectedUnit)
    { 
      setUnits(selectedUnit);
    }
  }


  return (
    <div className='flex flex-row justify-around my-6 '>
      <div className='flex flex-row items-center w-34 justify-center space-x-2 '>
        <input type="text" value={city} onChange={(e)=> setCity(e.currentTarget.value)} name="search" id="" placeholder='search for city...'
        className=' text-md font-light w-full p-2 shadow-xl capitalize focus:outline-none border-l-blue-40 rounded-lg border-blue-500 border-2 placeholder:lowercase '/>
        <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}/> 
        <UilSearch size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={()=>{if(city!==''){ setQuery({q: city}); setCity('');} }}/>
      </div>
      <div className='flex flex-row items-center justify-center gap-1 w-1/4 text-xl text-white'>
        <button name="metric" className='transition ease-out hover:scale-125 ' onClick={handleUnitChange}>°C</button>
        <p className=' cursor-default '>|</p>
        <button name="imperial" className='transition ease-out hover:scale-125 ' onClick={handleUnitChange}>°F</button>
      </div>
    </div>
  )
}

export default Inputs
