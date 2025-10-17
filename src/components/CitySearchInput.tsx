import { useState } from "react";

function CitySearchInput({ onAddCity }: { onAddCity: (city: string) => void }) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAdd = () => {
    if (input.trim()) {
      onAddCity(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "scale-105" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-50"></div>
        <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-1 shadow-xl border border-white/30">
          <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-4 py-3">
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder="Search for a city..."
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-base font-medium"
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={handleAdd}
              disabled={!input.trim()}
              className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed rounded-lg px-4 py-2 text-white font-medium transition-all duration-200 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CitySearchInput;
