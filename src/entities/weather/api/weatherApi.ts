import { baseApi } from '@/shared/api/baseApi';

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export const weatherApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentWeather: builder.query<
      WeatherData,
      { lat: number; lon: number; units?: string; lang?: string }
    >({
      query: ({ lat, lon, units = 'metric', lang = 'en' }) => ({
        url: '',
        params: {
          lat,
          lon,
          units,
          lang,
          type: 'weather',
        },
      }),
      providesTags: ['Weather'],
    }),
    getWeatherForecast: builder.query<
      ForecastData,
      { lat: number; lon: number; units?: string; lang?: string }
    >({
      query: ({ lat, lon, units = 'metric', lang = 'en' }) => ({
        url: '',
        params: {
          lat,
          lon,
          units,
          lang,
          type: 'forecast',
        },
      }),
      providesTags: ['Weather'],
    }),
    getWeatherByCity: builder.query<
      WeatherData,
      { city: string; units?: string; lang?: string }
    >({
      query: ({ city, units = 'metric', lang = 'en' }) => ({
        url: '',
        params: {
          q: city, // Используем 'q' для совместимости с OpenWeather API
          units,
          lang,
          type: 'weather',
        },
      }),
      providesTags: ['Weather'],
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetWeatherForecastQuery,
  useGetWeatherByCityQuery,
} = weatherApi;
