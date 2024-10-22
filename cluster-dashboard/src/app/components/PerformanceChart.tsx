"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";

export interface ChartData {
  timeSlot: string;
  [key: string]: number | string;
}

interface PerformanceChartProps {
  title: string;
  data: ChartData[];
  xAxisKey: string;
  lines: { dataKey: string; stroke: string; name: string }[];
  legendReadLabel: string;
  legendReadValue: string;
  legendWriteLabel: string;
  legendWriteValue: string;
}

export default function PerformanceChart({
  title,
  data,
  xAxisKey,
  lines,
  legendReadLabel,
  legendReadValue,
  legendWriteLabel,
  legendWriteValue,
}: PerformanceChartProps) {
  return (
      <div className="w-full" >
        <h2 className="font-18 font-semibold text-gray-300 mb-4">{title}</h2>
        <div className="mb-8 w-full flex">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                <XAxis
                    dataKey={xAxisKey}
                    tick={{ fill: '#A0A0A0', fontSize: 12 }}
                    axisLine={{ stroke: '#424242' }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: '#A0A0A0', fontSize: 12 }}
                    axisLine={{ stroke: '#424242' }}
                    tickLine={false}
                    width={60}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {lines.map((line) => (
                    <Line
                    key={line.dataKey}
                    type="monotone"
                    dataKey={line.dataKey}
                    stroke={line.stroke}
                    strokeWidth={2}
                    dot={false}
                    name={line.name}
                    />
                ))}
                </LineChart>
            </ResponsiveContainer>
            <CustomLegend
                title={title}
                readLabel={legendReadLabel}
                readValue={legendReadValue}
                writeLabel={legendWriteLabel}
                writeValue={legendWriteValue}
            />
        </div>
    </div>
  );
}
