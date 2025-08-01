import { ChevronLeft } from 'lucide-react';

import Link from 'next/link';

import { ForecastData } from '@/entities/weather/api/weatherApi';
import { ForecastChart } from '@/entities/weather/ui/ForecastChart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import Container from '@/shared/ui/container';

interface PageProps {
  params: { city: string };
}

interface DailyForecastData {
  date: Date;
  items: ForecastData['list'];
  minTemp: number;
  maxTemp: number;
  avgHumidity: number;
  avgPressure: number;
  descriptions: Set<string>;
}

async function getForecast(city: string): Promise<ForecastData | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${decodeURIComponent(city)}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) {
      console.error('Failed to fetch forecast data:', response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
}

export default async function ForecastPage({ params }: PageProps) {
  const forecastData = await getForecast(params.city);
  const cityName = forecastData?.city?.name || decodeURIComponent(params.city);

  return (
    <main className="min-h-screen w-full bg-background">
      <Container>
        <div className="py-4 sm:py-6 lg:py-8">
          <Card className="w-full">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
                    5-Day Weather Forecast
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    for {cityName}
                  </CardDescription>
                </div>
                <Link
                  href="/"
                  className="flex w-fit items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/20 sm:px-4 sm:py-2"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">
                    Back to current weather
                  </span>
                  <span className="sm:hidden">Back</span>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {forecastData ? (
                <div className="space-y-6">
                  <ForecastChart forecastData={forecastData} />
                  <ForecastDetails forecastData={forecastData} />
                </div>
              ) : (
                <div className="flex min-h-[400px] items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-medium text-muted-foreground">
                      Could not load forecast data.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please try again later.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}

function ForecastDetails({ forecastData }: { forecastData: ForecastData }) {
  const dailyData = forecastData.list.reduce(
    (acc, item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();

      if (!acc[dayKey]) {
        acc[dayKey] = {
          date,
          items: [],
          minTemp: Infinity,
          maxTemp: -Infinity,
          avgHumidity: 0,
          avgPressure: 0,
          descriptions: new Set(),
        };
      }

      acc[dayKey].items.push(item);
      acc[dayKey].minTemp = Math.min(acc[dayKey].minTemp, item.main.temp);
      acc[dayKey].maxTemp = Math.max(acc[dayKey].maxTemp, item.main.temp);
      acc[dayKey].avgHumidity += item.main.humidity;
      acc[dayKey].avgPressure += item.main.pressure;
      acc[dayKey].descriptions.add(item.weather[0]?.description || '');

      return acc;
    },
    {} as Record<string, DailyForecastData>
  );

  const dailyForecasts = Object.values(dailyData).map(
    (day: DailyForecastData) => ({
      ...day,
      avgHumidity: Math.round(day.avgHumidity / day.items.length),
      avgPressure: Math.round(day.avgPressure / day.items.length),
      description: Array.from(day.descriptions)[0] || '',
    })
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold sm:text-xl">Daily Overview</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dailyForecasts.map((day, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base">
                {day.date.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </CardTitle>
              <CardDescription className="text-xs capitalize sm:text-sm">
                {day.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High</span>
                  <span className="font-medium">
                    {Math.round(day.maxTemp)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Low</span>
                  <span className="font-medium">
                    {Math.round(day.minTemp)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium">{day.avgHumidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pressure</span>
                  <span className="font-medium">{day.avgPressure} hPa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
