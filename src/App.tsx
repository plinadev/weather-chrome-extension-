import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import CitySearchInput from "./components/CitySearchInput";

export default function App() {
  const [cities, setCities] = useState<string[]>(["Kyiv", "Kharkiv", "Lviv"]);

  const handleAddCity = (city: string) => {
    if (!cities.some((c) => c.toLowerCase() === city.toLowerCase())) {
      setCities([city, ...cities]);
    }
  };

  const handleRemoveCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index));
  };
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
              onRemove={() => handleRemoveCity(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}
