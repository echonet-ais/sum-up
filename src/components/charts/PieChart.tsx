"use client";

import * as React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { cn } from "../../lib/utils";

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PieChartData[];
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

const DEFAULT_COLORS = [
  "var(--color-orange-500)",
  "var(--color-blue-500)",
  "var(--color-green-500)",
  "var(--color-purple-500)",
  "var(--color-red-500)",
  "var(--color-yellow-500)",
  "var(--color-gray-500)",
];

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      height = 300,
      showLegend = true,
      showTooltip = true,
      innerRadius = 0,
      outerRadius = 80,
      className,
      ...props
    },
    ref
  ) => {
    const chartData = data.map((item, index) => ({
      ...item,
      color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name?: string; percent?: number }) => percent && name ? `${name}: ${(percent * 100).toFixed(0)}%` : (name || '')}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

PieChart.displayName = "PieChart";

export { PieChart };

