import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import CitySearchInput from "./components/CitySearchInput";
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "./utils/storage";
import Loader from "./components/Loader";
import Error from "./components/Error";
import type { ILocalStorageOptions } from "./types/storage";
import type { OpenWeatherTempScale } from "./types/weather";
import TempScaleToggle from "./components/TempScaleToggle";

export default function App() {
  const [cities, setCities] = useState<string[]>([]);
  const [options, setOptions] = useState<ILocalStorageOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchStorage = async () => {
      try {
        setLoading(true);
        const data = await getStoredCities();
        const options = await getStoredOptions();
        setCities(data);
        setOptions(options);
      } catch (err) {
        console.error(err);
        setError("Failed to get stored cities");
      } finally {
        setLoading(false);
      }
    };

    fetchStorage();
  }, []);

  const handleAddCity = (city: string) => {
    if (!cities.some((c) => c.toLowerCase() === city.toLowerCase())) {
      const updatedCitiesArr = [city, ...cities];
      setCities(updatedCitiesArr);
      setStoredCities(updatedCitiesArr);
    }
  };

  const handleRemoveCity = (index: number) => {
    const updatedCitiesArr = cities.filter((_, i) => i !== index);
    setCities(updatedCitiesArr);
    setStoredCities(updatedCitiesArr);
  };

  const handleTempScaleToggle = (scale: OpenWeatherTempScale) => {
    if (!options) return;
    const newOptions = { ...options, tempScale: scale };
    setOptions(newOptions);
    setStoredOptions(newOptions);
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-4">
      <div className="min-w-md mx-auto space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            Weather Dashboard
          </h1>
          <p className="text-white/80 text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <CitySearchInput onAddCity={handleAddCity} />

        {options && (
          <TempScaleToggle
            currentScale={options?.tempScale}
            onToggle={handleTempScaleToggle}
          />
        )}

        {options?.homeCity && (
          <WeatherCard city={options.homeCity} tempScale={options?.tempScale} />
        )}
        {cities.length === 0 ? (
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 text-center">
            <p className="text-white/70 text-lg">No cities added yet.</p>
            <p className="text-white/50 text-sm mt-2">
              Search for a city to see its weather.
            </p>
          </div>
        ) : (
          cities.map((city, index) => (
            <WeatherCard
              key={`${city}-${index}`}
              city={city}
              tempScale={options?.tempScale}
              onRemove={() => handleRemoveCity(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}
