import { DateTime } from "luxon";
import { toast } from 'react-toastify';


const API_KEY='c23ccd4faf719f98cbc8d6f556ef7c04';
const BASE_URL='https://api.openweathermap.org/data/2.5'

const getWeatherData=(infoType,searchParams)=>{
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url)
        .then((res)=>res.json())
};

const formatToLocalTime=(zone,secs,format= "cccc, dd LLL yyyy '| Local Time : ' hh:mm a ")=>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


const formatForecastData=(data)=>{
    let {timezone,hourly,daily} = data;
    daily= daily.slice(1,6).map((d)=>{
        return{
            title: formatToLocalTime(timezone,d.dt,'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly= hourly.slice(1,6).map((h)=>{
        return{
            title: formatToLocalTime(timezone,h.dt,"hh:mm"),
            temp: h.temp,
            icon: h.weather[0].icon
        }});
    return {timezone,daily,hourly};
}

const formatCurrentWeather = (data) => {
    const {
            coord:{lat,lon},
            weather,
            main: {temp,feels_like, temp_min, temp_max, humidity},
            dt,
            wind: {speed},
            name,
            sys: {country,sunrise,sunset}
  }  = data;

  const {description, icon} =  weather[0];

  return {  lat,
            lon,
            description,
            icon,
            temp,
            feels_like,
            temp_min,
            temp_max,
            humidity,
            dt,
            name,
            country,
            sunrise,
            sunset, 
            speed
        };
}

const getFormattedWeatherData = async (searchParams)=>{
    const formattedData = await getWeatherData("weather",searchParams)
                                .then(formatCurrentWeather);

    const {lat,lon}= formattedData;

    const getFormattedForecastData = await getWeatherData("onecall",{
        lat,
        lon,
        exclude:"current,minutely,alerts",
        units: searchParams.units
    }).then(formatForecastData);
    toast.success("Successfully fetched weather for "+ formattedData.name + ',' + formattedData.country);
    
    return {...formattedData, ...getFormattedForecastData};
}

export default getFormattedWeatherData;

export { formatToLocalTime };