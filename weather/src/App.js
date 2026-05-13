import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "7277d394048719a0fcd50bae76a94741";

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather({
        city: data.name,
        temp: data.main.temp,
        condition: data.weather[0].main,
      });
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d5b4f5] min-h-screen relative overflow-hidden flex flex-col items-center pt-14">

      {/* Top Left Circle */}
      <img
        src="/circle-left.png"
        alt="circle left"
        className="absolute top-0 left-0 w-[340px]"
      />

      {/* Bottom Right Circle */}
      <img
        src="/circle-right.png"
        alt="circle right"
        className="absolute bottom-0 right-0 w-[340px]"
      />

      {/* Title */}
      <h1 className="text-[78px] font-black text-[#032B35] z-10 leading-none">
        Weather Finder App
      </h1>

      {/* Search Section */}
      <div className="flex gap-6 mt-14 z-10">

        {/* Input */}
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
          className="w-[400px] h-[85px] bg-[#B7E7C1] border-[6px] border-[#032B35] rounded-2xl px-7 text-[28px] font-bold text-[#032B35] outline-none placeholder:text-[#032B35]"
        />

        {/* Button */}
        <button
          onClick={getWeather}
          className="w-[270px] h-[85px] bg-[#032B35] rounded-2xl text-[#B7E7C1] text-[48px] font-light hover:scale-105 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="mt-10 text-3xl font-bold text-[#032B35] z-10">
          Loading...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-10 text-3xl font-bold text-red-600 z-10">
          {error}
        </p>
      )}

      {/* Weather Card */}
      {weather && (
        <div className="bg-white mt-10 px-10 py-8 rounded-3xl shadow-2xl z-10 text-center">
          
          <h2 className="text-4xl font-bold text-[#032B35]">
            {weather.city}
          </h2>

          <h1 className="text-7xl font-black text-green-600 mt-4">
            {weather.temp}°C
          </h1>

          <p className="text-3xl text-[#032B35] mt-2">
            {weather.condition}
          </p>

        </div>
      )}

      {/* Left Bunny */}
      <img
        src="/bunny-left.png"
        alt="bunny left"
        className="absolute bottom-0 left-0 w-[220px]"
      />

      {/* Right Bunny */}
      <img
        src="/bunny-right.png"
        alt="bunny right"
        className="absolute bottom-0 right-0 w-[220px]"
      />
    </div>
  );
}