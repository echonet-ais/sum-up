"use client";

import * as React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../../lib/utils";

export interface LineChartData {
  name: string;
  [key: string]: string | number;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: LineChartData[];
  dataKeys: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "var(--color-orange-500)",
  "var(--color-blue-500)",
  "var(--color-green-500)",
  "var(--color-purple-500)",
  "var(--color-red-500)",
];

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      dataKeys,
      height = 300,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      colors = DEFAULT_COLORS,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

LineChart.displayName = "LineChart";

export { LineChart };

