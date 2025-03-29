"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherData {
  condition: string;
  description: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  country: string;
  placeName: string;
  longitude: number;
  latitude: number;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api?city=${cityName}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "An error occured");

      setWeather(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : " An error occured");
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {

    setLoading(true);

    if (!navigator.geolocation) {
      setError("The browser doesn't support the geolocation");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchPlaceName(latitude, longitude);
      },
      (err) => {
        setError(`Error getting the user's location : ${err.message}`);
        fetchWeather("Helsinki");
      }
    );
  };

  const fetchPlaceName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
      );
      const data = await response.json();
      const city = data.address?.city || data.address?.town || "Unknown";
      fetchWeather(city);
    } catch (err) {
      setError(`Failed to fetch the city name`);
      fetchWeather("Helsinki");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearch = (e: React.FormEvent)=>{
    e.preventDefault()
    if(city.trim()) {
      fetchWeather(city)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-20 p-10 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl text-center space-y-6"
    >
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-3xl font-bold text-indigo-800"
      >
        Weather 🌦️🌅
      </motion.h2>

      <form onSubmit={handleSearch} className="flex space-x-3">
        <input
          type="text"
          placeholder="Enter a city"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-white/80 shadow-inner"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-3 rounded-lg text-white font-medium transition-colors duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Search"}
        </motion.button>
      </form>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-600 font-medium bg-red-100 p-2 rounded-lg"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {weather && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-5 rounded-xl bg-gradient-to-t from-indigo-200 to-blue-100 shadow-md"
        >
          <h3 className="text-xl font-bold text-indigo-900">
            {weather.placeName}, {weather.country}
          </h3>
          <p className="text-lg text-gray-700 capitalize">
            {weather.condition} - {weather.description}
          </p>
          <motion.p
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl font-extrabold text-indigo-800 mt-2"
          >
            {weather.temperature}°C
          </motion.p>
          <p className="text-sm text-gray-600 mt-1">
            Feels like {weather.feelsLike}°C
          </p>
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p>Humidity: {weather.humidity}%</p>
            <p className="text-xs text-gray-500">
              Lon: {weather.longitude}, Lat: {weather.latitude}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
