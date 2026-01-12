import { LucideIcon, TrendingUp, TrendingDown, Users, DollarSign, Activity } from "lucide-react";

export interface Metric {
  id: string;
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  data: { name: string; value: number }[];
  type: 'line' | 'bar' | 'area';
  icon: any;
  description: string;
}

export const mockMetrics: Metric[] = [
  {
    id: 'churn-rate',
    name: 'Churn Rate',
    value: '2.4%',
    change: -0.5,
    trend: 'down', // Good for churn
    type: 'area',
    icon: Activity,
    description: 'Percentage of customers who stopped using the service.',
    data: [
      { name: 'Mon', value: 2.8 },
      { name: 'Tue', value: 2.6 },
      { name: 'Wed', value: 2.9 },
      { name: 'Thu', value: 2.5 },
      { name: 'Fri', value: 2.4 },
      { name: 'Sat', value: 2.3 },
      { name: 'Sun', value: 2.4 },
    ]
  },
  {
    id: 'retention-rate',
    name: 'Retention Rate',
    value: '88.2%',
    change: 1.2,
    trend: 'up',
    type: 'bar',
    icon: Users,
    description: 'Percentage of customers who continue to use the service.',
    data: [
      { name: 'Week 1', value: 92 },
      { name: 'Week 2', value: 89 },
      { name: 'Week 3', value: 88 },
      { name: 'Week 4', value: 88.2 },
    ]
  },
  {
    id: 'clv',
    name: 'Customer Lifetime Value',
    value: '$4,250',
    change: 5.4,
    trend: 'up',
    type: 'line',
    icon: DollarSign,
    description: 'Total revenue a business can reasonably expect from a single customer account.',
    data: [
      { name: 'Jan', value: 3800 },
      { name: 'Feb', value: 3900 },
      { name: 'Mar', value: 4050 },
      { name: 'Apr', value: 4100 },
      { name: 'May', value: 4250 },
    ]
  },
  {
    id: 'dau',
    name: 'Daily Active Users',
    value: '14.5k',
    change: 3.1,
    trend: 'up',
    type: 'area',
    icon: Users,
    description: 'Number of unique users who engaged with the app today.',
    data: [
      { name: 'Mon', value: 12000 },
      { name: 'Tue', value: 13500 },
      { name: 'Wed', value: 14000 },
      { name: 'Thu', value: 13800 },
      { name: 'Fri', value: 14500 },
      { name: 'Sat', value: 15000 },
      { name: 'Sun', value: 14800 },
    ]
  }
];
