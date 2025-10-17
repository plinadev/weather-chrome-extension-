import { useEffect, useState } from "react";
import { fetchOpenWeatherData } from "../utils/api";
import type { IOpenWeather } from "../types/weather";

function WeatherCard({
  city,
  onRemove,
}: {
  city: string;
  onRemove?: () => void;
}) {
  const [weather, setWeather] = useState<IOpenWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchOpenWeatherData(city);
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError("Failed to get weather data for that city :(");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 w-full">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-white text-sm font-medium">Loading {city}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 w-full">
        <p className="text-white text-sm font-medium text-center">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  const { name, main, weather: weatherArr, wind } = weather;
  const current = weatherArr[0];

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/30 w-full hover:bg-white/25 transition-all duration-300 relative group">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute hover:cursor-pointer top-3 right-3 w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-red-500/80 rounded-full text-white/60 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Remove city"
        >
          ✕
        </button>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            {name}
          </h2>
          <p className="text-white/70 text-xs mt-1">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt={current.description}
          className="w-16 h-16 drop-shadow-lg"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <p className="text-5xl font-bold text-white drop-shadow-lg">
            {Math.round(main.temp)}°
          </p>
          <p className="text-white/80 text-lg capitalize">
            {current.description}
          </p>
        </div>
        <p className="text-white/60 text-sm mt-1">
          Feels like {Math.round(main.feels_like)}°
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="bg-white/10 rounded-xl p-2 text-center border border-white/20">
          <p className="text-white/60 text-xs mb-1">High</p>
          <p className="text-white text-base font-bold">
            {Math.round(main.temp_max)}°
          </p>
        </div>
        <div className="bg-white/10 rounded-xl p-2 text-center border border-white/20">
          <p className="text-white/60 text-xs mb-1">Low</p>
          <p className="text-white text-base font-bold">
            {Math.round(main.temp_min)}°
          </p>
        </div>
        <div className="bg-white/10 rounded-xl p-2 text-center border border-white/20">
          <p className="text-white/60 text-xs mb-1">Humid</p>
          <p className="text-white text-base font-bold">{main.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-2 text-center border border-white/20">
          <p className="text-white/60 text-xs mb-1">Wind</p>
          <p className="text-white text-base font-bold">
            {wind.speed.toFixed(1)}m/s
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/60">Live</span>
        </div>
        <div className="text-white/60">
          {getWindDirection(wind.deg)} • {main.pressure} hPa
        </div>
      </div>
    </div>
  );
}
export default WeatherCard;
