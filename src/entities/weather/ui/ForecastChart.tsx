'use client';

import { format } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ForecastData } from '../api/weatherApi';

interface ForecastChartProps {
  forecastData: ForecastData;
}

export function ForecastChart({ forecastData }: ForecastChartProps) {
  const chartData = forecastData.list.map(item => ({
    date: format(new Date(item.dt * 1000), 'MMM d, HH:mm'),
    temp: item.main.temp,
    feels_like: item.main.feels_like,
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorFeels" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--accent))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--accent))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{ value: '°C', position: 'insideLeft', angle: -90, dy: 10 }}
          />
          <Tooltip
            formatter={(value: number) => `${value.toFixed(1)}°C`}
            labelStyle={{ fontWeight: 'bold' }}
            wrapperClassName="rounded-md border bg-background p-2 shadow-sm"
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorTemp)"
            name="Temperature"
          />
          <Area
            type="monotone"
            dataKey="feels_like"
            stroke="hsl(var(--accent))"
            fillOpacity={1}
            fill="url(#colorFeels)"
            name="Feels Like"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
