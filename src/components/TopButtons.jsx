import React from 'react'

function TopButtons({setQuery, setCity}) {
    const cities =[
        {
            id : 1,
            title : 'Lucknow'
        },
        {
            id : 2,
            title : 'Delhi'
        },
        {
            id : 3,
            title : 'Mumbai'
        },
        {
            id : 4,
            title : 'Bangalore',
        },
        {
            id : 5,
            title : 'Chennai'
        }
    ]
  return (
    <div className=" flex items-center justify-around my-3 ">
      {cities.map((city)=>(
            <button key={city.id} className= "text-white text-xl sm:text-tiny font-medium transition ease-out hover:scale-125" style={{"font-size":"2.5vh"}} onClick={()=> setQuery({q:city.title})}>
              {city.title}
            </button>
      ))}
    </div>
  )
}

export default TopButtons
