import type { IOpenWeather, OpenWeatherTempScale } from "../types/weather";

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<IOpenWeather> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${OPEN_WEATHER_API_KEY}&units=${tempScale}`
  );

  if (!res.ok) {
    throw new Error(`City not found: ${city}`);
  }

  return await res.json();
}
