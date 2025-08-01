# Super Advanced Weather App

A modern web application for viewing weather information built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Current Weather** - display temperature, humidity, wind, and pressure
- **5-Day Forecast** - detailed weather forecast for 5 days
- **City Search** - search for weather in any city worldwide
- **Responsive Design** - beautiful and modern interface
- **Multi-language Support** - support for various languages
- **Real-time Data** - up-to-date weather information

## 🛠 Technologies

- **Next.js 14** - React framework
- **TypeScript** - typed JavaScript
- **Tailwind CSS** - utility-first CSS framework
- **Redux Toolkit** - state management
- **RTK Query** - caching and API management
- **Lucide React** - icons
- **OpenWeatherMap API** - weather data

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/super-advanced-weather-app.git
   cd super-advanced-weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env file**

   ```bash
   cp env.example .env
   ```

4. **Configure environment variables**
   Open `.env` and add your OpenWeatherMap API key:

   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=4cb29457cd5500c205f903cc9db85e43
   ```

5. **Run the project**

   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# OpenWeatherMap API key
# Get a free key at https://openweathermap.org/api
NEXT_PUBLIC_OPENWEATHER_API_KEY=4cb29457cd5500c205f903cc9db85e43

# Weather API base URL
NEXT_PUBLIC_BASE_URL=https://api.openweathermap.org/data/2.5

# Default language (optional)
NEXT_PUBLIC_DEFAULT_LANGUAGE=en

# Units of measurement (optional)
NEXT_PUBLIC_UNITS=metric
```

### Getting OpenWeatherMap API Key

1. Register at [OpenWeatherMap](https://openweathermap.org/)
2. Go to [API Keys](https://home.openweathermap.org/api_keys)
3. Create a new API key
4. Copy the key to the `NEXT_PUBLIC_WEATHER_API_KEY` variable

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── forecast/          # Forecast page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── entities/              # Business entities
│   └── weather/           # Weather entity
│       ├── api/           # Weather API
│       └── ui/            # UI components
├── features/              # Feature modules
├── pages-components/      # Page components
├── shared/               # Shared components and utilities
│   ├── api/              # Base API utilities
│   ├── config/           # Configuration
│   ├── constants/        # Constants
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Libraries
│   ├── types/            # TypeScript types
│   ├── ui/               # UI components
│   └── utils/            # Utilities
└── widgets/              # Widgets
```

## 🚀 Scripts

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start

# TypeScript type checking
npm run type-check

# Code linting
npm run lint

# Code formatting
npm run format
```

## 🌤 API Endpoints

### Current Weather

```
GET /api/weather?city={city}&lang={lang}
```

### 5-Day Forecast

```
GET /api/forecast?city={city}&lang={lang}
```

## 🎨 UI/UX Features

- **Modern Design** using Tailwind CSS
- **Responsive Layout** for all devices
- **Smooth Animations** and transitions
- **Intuitive Search** for cities
- **Visual Indicators** for weather conditions
- **Loaders** for better UX

## 🔄 Application State

The application uses Redux Toolkit for state management:

- **Weather Data** - caching and API request management
- **City Search** - search and filtering management
- **Settings** - language, units of measurement

## 📱 Responsiveness

The application is fully responsive and works on:

- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktops
- 🖥 Large screens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) - for providing weather API
- [Next.js](https://nextjs.org/) - for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) - for the utility-first CSS framework
- [Lucide](https://lucide.dev/) - for beautiful icons
