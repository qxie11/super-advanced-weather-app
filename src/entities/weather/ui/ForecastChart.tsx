'use client';

import { format } from 'date-fns';
import {
  CartesianGrid,
  Line,
  LineChart,
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
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
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
          <Line
            type="monotone"
            dataKey="temp"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            name="Temperature"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="feels_like"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            name="Feels Like"
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
