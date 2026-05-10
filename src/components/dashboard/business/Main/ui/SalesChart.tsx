'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SalesTrend {
  date: string;
  revenue: number;
}

interface SalesChartProps {
  data: SalesTrend[];
}

export function SalesChart({ data }: SalesChartProps) {
  // Format date for display (MM-DD)
  const chartData = data.map(item => ({
    ...item,
    displayDate: item.date.split('-').slice(1).join('-')
  }));

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FF7A00" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#2E2E2E" />
          <XAxis 
            dataKey="displayDate" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#737373' }}
            minTickGap={20}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#737373' }}
            tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0E0E0E',
              borderRadius: '16px', 
              border: '1px solid #2E2E2E', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
              fontSize: '12px',
              fontWeight: '600',
              color: '#FFFFFF'
            }}
            formatter={(value: number) => [formatCurrency(value), 'Ventas']}
            labelStyle={{ color: '#737373', marginBottom: '4px' }}
            itemStyle={{ color: '#FF7A00' }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#FF7A00" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
