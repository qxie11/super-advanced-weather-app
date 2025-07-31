import Link from 'next/link';

import { ForecastData } from '@/entities/weather/api/weatherApi';
import { ForecastChart } from '@/entities/weather/ui/ForecastChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>5-Day Weather Forecast for {cityName}</CardTitle>
          </CardHeader>
          <CardContent>
            {forecastData ? (
              <ForecastChart forecastData={forecastData} />
            ) : (
              <p>Could not load forecast data.</p>
            )}
            <div className="mt-4 text-center">
              <Link href="/" className="text-blue-500 hover:underline">
                Back to current weather
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
