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
        <div className="py-8">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>5-Day Weather Forecast</CardTitle>
                  <CardDescription>for {cityName}</CardDescription>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ChevronLeft size={16} />
                  Back to current weather
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {forecastData ? (
                <ForecastChart forecastData={forecastData} />
              ) : (
                <p>Could not load forecast data.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
