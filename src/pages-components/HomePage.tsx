import { WeatherData } from '@/entities/weather/api/weatherApi';
import { WeatherWidget } from '@/entities/weather/ui/WeatherWidget';
import Container from '@/shared/ui/container';

interface HomePageProps {
  defaultCityData?: WeatherData;
}

const HomePage = ({ defaultCityData }: HomePageProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <Container>
        <div className="flex justify-center">
          <WeatherWidget defaultCityData={defaultCityData} />
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
