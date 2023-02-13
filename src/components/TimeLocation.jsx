import React from 'react'
import { formatToLocalTime } from '../services/weatherServices'

function TimeLocation({weather:{dt,timezone,name,country}}) {
  return (
    <div className='text-l text-white flex flex-col my-6 items-center justify-center gap-3'>
      <p className='font-extralight'>{formatToLocalTime(timezone,dt)}</p>
      <p className='text-2xl font-medium'>{`${name},${country}`}</p>
    </div>
  )
}

export default TimeLocation
