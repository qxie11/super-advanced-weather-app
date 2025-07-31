import { WeatherData } from '@/entities/weather/api/weatherApi';
import { WeatherWidget } from '@/entities/weather/ui/WeatherWidget';

interface HomePageProps {
  defaultCityData?: WeatherData;
}

const HomePage = ({ defaultCityData }: HomePageProps) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <WeatherWidget defaultCityData={defaultCityData} />
    </main>
  );
};

export default HomePage;
