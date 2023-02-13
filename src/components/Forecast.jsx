import React from 'react'

function Forecast({title, items, units}) {
 
    return (
    <div className='my-5'>
        <p className='text-white font-bold uppercase'> {title} Forecast </p>
        <hr className='my-1'/>

        <div className='flex flex-row  text-white font-light justify-between items-center'> {/*Hourly Forecasts*/}
            
            {items.map((item)=>{
                return(
                            <div key={item.title} className='flex font-medium  flex-col items-center justify-center'>
                                <p>{item.title}</p>
                                <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="" className='w-16' style={{filter: "drop-shadow(5px 5px 5px #666666)"}}/>
                                <p className='font-bold text-lg text-white'>{Math.round(item.temp)}{`°${units==='metric'?'C':'F'}`}</p>
                            </div>)
             })}
            
            
        </div> {/*End Forecasts */}
    </div>
  )
}

export default Forecast
