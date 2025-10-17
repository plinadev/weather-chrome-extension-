import { useEffect, useState } from "react";
import type { ILocalStorageOptions } from "../types/storage";
import { getStoredOptions, setStoredOptions } from "../utils/storage";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Options() {
  const [options, setOptions] = useState<ILocalStorageOptions | null>(null);
  const [city, setCity] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        setLoading(true);
        const options = await getStoredOptions();
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

  const handleSave = () => {
    if (!options) return;

    if (city.trim()) {
      setShowSuccess(true);
      const newOptions = { ...options, homeCity: city };
      setOptions(newOptions);
      setStoredOptions(newOptions);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 w-full max-w-md hover:bg-white/25 transition-all duration-300">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
            <span className="text-4xl">⚙️</span>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            Weather Extension
          </h1>
          <p className="text-white/70 text-sm">
            Configure your home city for quick weather access
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2 drop-shadow">
              Home City
            </label>
            <input
              type="text"
              placeholder="Enter a city name (e.g., London)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-white/20 hover:bg-white/30 border border-white/40 rounded-xl px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            Save Settings
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 bg-green-500/20 border border-green-400/30 rounded-xl p-3 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-white/90 text-sm">
                Settings saved successfully!
              </p>
            </div>
          </div>
        )}

        {/* Current Setting Display */}
        {options?.homeCity && (
          <div className="mt-6 bg-white/10 rounded-xl p-4 border border-white/20">
            <p className="text-white/60 text-xs mb-1">Current Home City</p>
            <p className="text-white text-lg font-bold drop-shadow">
              {options.homeCity}
            </p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Extension Active</span>
            </div>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
