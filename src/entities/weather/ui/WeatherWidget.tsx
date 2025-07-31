'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useLanguage } from '@/shared/hooks/useLanguage';

import { WeatherData, useGetWeatherByCityQuery } from '../api/weatherApi';

interface WeatherWidgetProps {
  defaultCityData?: WeatherData;
}

export function WeatherWidget({ defaultCityData }: WeatherWidgetProps) {
  const [city, setCity] = useState(defaultCityData?.name || '');
  const [searchCity, setSearchCity] = useState('');
  const lang = useLanguage();

  const {
    data: weatherData = defaultCityData,
    isLoading,
    error,
  } = useGetWeatherByCityQuery({ city, lang }, { skip: !city });

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity.trim());
      setSearchCity('');
    }
  };

  if (isLoading && !defaultCityData) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading weather data</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchCity}
            onChange={e => setSearchCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </div>

      {weatherData && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {weatherData.name}, {weatherData.sys.country}
          </h2>

          <div className="mb-4">
            <div className="text-6xl font-bold text-blue-600">
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="text-lg text-gray-600 capitalize">
              {weatherData.weather[0]?.description}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">Feels like</div>
              <div className="font-semibold">
                {Math.round(weatherData.main.feels_like)}°C
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">Humidity</div>
              <div className="font-semibold">{weatherData.main.humidity}%</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">Wind</div>
              <div className="font-semibold">{weatherData.wind.speed} m/s</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">Pressure</div>
              <div className="font-semibold">
                {weatherData.main.pressure} hPa
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href={`/forecast/${encodeURIComponent(weatherData.name)}`}
              className="inline-block px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              View 5-Day Forecast
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
