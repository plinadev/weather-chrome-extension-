import type { OpenWeatherTempScale } from "../types/weather";

interface TempScaleToggleProps {
  currentScale: OpenWeatherTempScale;
  onToggle: (scale: OpenWeatherTempScale) => void;
}
function TempScaleToggle({ currentScale, onToggle }: TempScaleToggleProps) {
  const nextScale = currentScale === "metric" ? "imperial" : "metric";
  return (
    <button
      className=" ml-[80%] px-4 py-2 hover:cursor-pointer rounded-full bg-white/20 text-white hover:bg-white/30 transition"
      onClick={() => onToggle(nextScale)}
    >
      {currentScale === "metric" ? "°C → °F" : "°F → °C"}
    </button>
  );
}

export default TempScaleToggle;
