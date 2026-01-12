import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Metric } from '../data/mockData';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowDown, ArrowUp, Info, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface MetricCardProps {
  metric: Metric;
  onRemove?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, onRemove }) => {
  const isPositive = metric.change > 0;
  // For churn, negative change is usually "good" (green), but let's stick to simple logic for now: 
  // Green if trend matches desired direction.
  // For simplicity, let's just say "up" is green, "down" is red unless it's Churn.
  
  const isGood = metric.id === 'churn-rate' ? metric.change < 0 : metric.change > 0;
  const color = isGood ? 'text-green-500' : 'text-red-500';
  const strokeColor = '#1E3A8A'; // Blue-900
  const fillColor = '#BFDBFE'; // Blue-200

  const renderChart = () => {
    switch (metric.type) {
      case 'area':
        return (
          <AreaChart data={metric.data}>
            <defs>
              <linearGradient id={`color-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" hide />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="value" stroke={strokeColor} fillOpacity={1} fill={`url(#color-${metric.id})`} />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={metric.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" hide />
            <Tooltip 
               cursor={{fill: 'transparent'}}
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" fill={strokeColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'line':
      default:
        return (
          <LineChart data={metric.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" hide />
            <Tooltip 
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} dot={{r: 3, fill: strokeColor}} />
          </LineChart>
        );
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
          {React.createElement(metric.icon, { size: 16 })}
          {metric.name}
        </CardTitle>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onRemove} className="text-red-600 focus:text-red-600">
                    Remove Widget
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-baseline gap-2 mb-4">
            <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
            <div className={`text-xs font-medium flex items-center ${color}`}>
                {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {Math.abs(metric.change)}%
                <span className="text-slate-400 ml-1 font-normal">vs last period</span>
            </div>
        </div>
        <div className="h-32 w-full mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
