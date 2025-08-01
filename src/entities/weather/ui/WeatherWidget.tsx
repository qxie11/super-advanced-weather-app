'use client';

import {
  Cloud,
  Droplets,
  Gauge,
  Loader2,
  MapPin,
  Search,
  Sun,
  Thermometer,
  Wind,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useLanguage } from '@/shared/hooks/useLanguage';

import { WeatherData, useGetWeatherByCityQuery } from '../api/weatherApi';

interface WeatherWidgetProps {
  defaultCityData?: WeatherData;
}

export function WeatherWidget({ defaultCityData }: WeatherWidgetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityFromQuery = searchParams.get('q');

  const defaultCity = cityFromQuery || defaultCityData?.name || 'London';

  const [city, setCity] = useState(defaultCity);
  const [inputValue, setInputValue] = useState(city);
  const lang = useLanguage();

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && trimmedValue.length > 1) {
      router.push(`/?q=${encodeURIComponent(trimmedValue)}`, {
        scroll: false,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (cityFromQuery) {
      setCity(cityFromQuery);
    }
  }, [cityFromQuery]);

  const {
    data: weatherData,
    isLoading,
    isFetching,
    error,
  } = useGetWeatherByCityQuery(
    { city, lang },
    {
      skip:
        !city || defaultCityData?.name?.toLowerCase() === city.toLowerCase(),
    }
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const currentData = weatherData || defaultCityData;

  const renderWeatherIcon = (weatherMain: string) => {
    switch (weatherMain) {
      case 'Clouds':
        return <Cloud className="h-16 w-16 text-slate-400" />;
      case 'Rain':
      case 'Drizzle':
        return <Droplets className="h-16 w-16 text-blue-400" />;
      case 'Clear':
        return <Sun className="h-16 w-16 text-yellow-400" />;
      default:
        return <Cloud className="h-16 w-16 text-slate-400" />;
    }
  };

  const isLoadingState = isLoading || isFetching;

  return (
    <>
      {isLoadingState && (
        <div className="fixed top-4 right-4 z-50">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}
      <div className="w-full max-w-lg rounded-xl bg-card/80 backdrop-blur-sm p-4 shadow-lg ring-1 ring-black/10 sm:p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={inputValue}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search for a city..."
              className="w-full rounded-md border-border bg-background/50 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Search
            </button>
          </div>
        </div>

        {error && !isLoadingState && (
          <div className="rounded-md bg-destructive/10 p-4 text-center text-destructive">
            <p>Could not load weather data for this city.</p>
          </div>
        )}

        {!currentData && !isLoadingState && !error && (
          <div className="text-center text-muted-foreground">
            No data available.
          </div>
        )}

        {currentData && !error && (
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <MapPin className="h-6 w-6" />
                  {currentData.name}, {currentData.sys.country}
                </h2>
                <p className="text-muted-foreground capitalize">
                  {currentData.weather[0]?.description}
                </p>
              </div>
              {renderWeatherIcon(currentData.weather[0]?.main)}
            </div>

            <div className="my-6 text-center">
              <span className="text-7xl font-bold">
                {Math.round(currentData.main.temp)}
              </span>
              <span className="align-super text-3xl">°C</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
                <Thermometer size={20} className="text-primary" />
                <div>
                  <div className="text-muted-foreground">Feels like</div>
                  <div className="font-semibold">
                    {Math.round(currentData.main.feels_like)}°C
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
                <Droplets size={20} className="text-primary" />
                <div>
                  <div className="text-muted-foreground">Humidity</div>
                  <div className="font-semibold">
                    {currentData.main.humidity}%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
                <Wind size={20} className="text-primary" />
                <div>
                  <div className="text-muted-foreground">Wind</div>
                  <div className="font-semibold">
                    {currentData.wind.speed} m/s
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
                <Gauge size={20} className="text-primary" />
                <div>
                  <div className="text-muted-foreground">Pressure</div>
                  <div className="font-semibold">
                    {currentData.main.pressure} hPa
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href={`/forecast/${encodeURIComponent(currentData.name)}`}
                className="inline-block w-full rounded-md bg-primary py-3 text-center font-semibold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                View 5-Day Forecast
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
