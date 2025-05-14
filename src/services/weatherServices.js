import { DateTime } from "luxon";
import { toast } from "react-toastify";

const API_KEY = "43b2a9b0053d76a13d8af3573c93c4e3";
const BASE_URL = "https://api.openweathermap.org/data/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatToLocalTime = (
  zone,
  secs,
  format = "cccc, dd LLL yyyy '| Local Time : ' hh:mm a "
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatForecastData = (data) => {
  let { timezone, hourly, daily } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(timezone, d.dt, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((h) => {
    return {
      title: formatToLocalTime(timezone, h.dt, "hh:mm"),
      temp: h.temp,
      icon: h.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    dt,
    wind: { speed },
    name,
    sys: { country, sunrise, sunset },
  } = data;

  const { description, icon } = weather[0];

  return {
    lat,
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
    speed,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedData = await getWeatherData("2.5/weather", searchParams).then(
    formatCurrentWeather
  );

  const { lat, lon } = formattedData;

  const getFormattedForecastData = await getWeatherData("3.0/onecall", {
    lat,
    lon,
    // exclude: "current,minutely,alerts",
    units: searchParams.units || "metric",
  }).then(formatForecastData);
  toast.success(
    "Successfully fetched weather for " +
      formattedData.name +
      "," +
      formattedData.country
  );

  return { ...formattedData, ...getFormattedForecastData };
};

export default getFormattedWeatherData;

export { formatToLocalTime };
