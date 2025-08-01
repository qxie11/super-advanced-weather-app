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
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold sm:text-xl">Temperature Trend</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span>Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent"></div>
            <span>Feels Like</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 20,
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
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{
                value: '°C',
                position: 'insideLeft',
                angle: -90,
                dy: 10,
                style: { fontSize: 12 },
              }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}°C`, '']}
              labelFormatter={label => `Time: ${label}`}
              labelStyle={{ fontWeight: 'bold', fontSize: 14 }}
              wrapperClassName="rounded-lg border bg-background p-3 shadow-lg"
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={0.3}
              fill="url(#colorTemp)"
              name="Temperature"
            />
            <Area
              type="monotone"
              dataKey="feels_like"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              fillOpacity={0.3}
              fill="url(#colorFeels)"
              name="Feels Like"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
