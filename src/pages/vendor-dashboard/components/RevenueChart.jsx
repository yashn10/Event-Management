import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueChart = ({ data, period, onPeriodChange }) => {
  const [chartType, setChartType] = useState('bar');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="font-body font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm font-caption text-muted-foreground">
                {entry?.name}: {formatCurrency(entry?.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '3 Months' },
    { value: '1y', label: '1 Year' }
  ];

  const totalRevenue = data?.reduce((sum, item) => sum + item?.revenue, 0);
  const totalCommission = data?.reduce((sum, item) => sum + item?.commission, 0);
  const averageDaily = totalRevenue / data?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Revenue Analytics
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              Track your earnings and commission breakdown
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-md transition-smooth ${
                  chartType === 'bar' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="BarChart3" size={16} />
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-2 rounded-md transition-smooth ${
                  chartType === 'line' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="TrendingUp" size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {periods?.map((p) => (
            <Button
              key={p?.value}
              variant={period === p?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPeriodChange(p?.value)}
            >
              {p?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="text-sm font-caption text-primary">Total Revenue</span>
            </div>
            <div className="text-xl font-heading font-bold text-foreground">
              {formatCurrency(totalRevenue)}
            </div>
          </div>
          
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Percent" size={16} className="text-warning" />
              <span className="text-sm font-caption text-warning">Commission Paid</span>
            </div>
            <div className="text-xl font-heading font-bold text-foreground">
              {formatCurrency(totalCommission)}
            </div>
          </div>
          
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-success" />
              <span className="text-sm font-caption text-success">Daily Average</span>
            </div>
            <div className="text-xl font-heading font-bold text-foreground">
              {formatCurrency(averageDaily)}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="period" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="var(--color-primary)" 
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="commission" 
                  fill="var(--color-warning)" 
                  name="Commission"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="period" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  name="Revenue"
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="commission" 
                  stroke="var(--color-warning)" 
                  strokeWidth={3}
                  name="Commission"
                  dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;