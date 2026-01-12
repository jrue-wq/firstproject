import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Plus, Share2, Calendar, Mail, MoreHorizontal, LayoutGrid, List } from "lucide-react";
import { MetricCard } from './MetricCard';
import { AddMetricModal } from './AddMetricModal';
import { CreateDashboardModal } from './CreateDashboardModal';
import { mockMetrics, Metric } from '../data/mockData';
import { toast } from 'sonner';

export const Dashboard = () => {
    const [activeDashboard, setActiveDashboard] = useState('Mobile Growth');
    // Start with a few default metrics
    const [dashboardMetrics, setDashboardMetrics] = useState<Metric[]>([
        mockMetrics.find(m => m.id === 'churn-rate')!,
        mockMetrics.find(m => m.id === 'retention-rate')!,
        mockMetrics.find(m => m.id === 'clv')!
    ].filter(Boolean));

    const [isAddMetricOpen, setIsAddMetricOpen] = useState(false);
    const [isCreateDashboardOpen, setIsCreateDashboardOpen] = useState(false);

    const handleAddMetrics = (ids: string[]) => {
        const newMetrics = mockMetrics.filter(m => ids.includes(m.id));
        setDashboardMetrics([...dashboardMetrics, ...newMetrics]);
        toast.success(`Added ${newMetrics.length} metrics to dashboard`);
    };

    const handleRemoveMetric = (id: string) => {
        setDashboardMetrics(dashboardMetrics.filter(m => m.id !== id));
        toast.info("Metric removed from view");
    };

    const handleCreateDashboard = (data: any) => {
        setActiveDashboard(data.name);
        setDashboardMetrics([]); // Start fresh or maybe with defaults?
        toast.success(`Dashboard "${data.name}" created!`);
    };

    const handleScheduleEmail = () => {
        toast.success("Email report scheduled successfully!");
    }

    return (
        <div className="flex-1 h-screen overflow-y-auto bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
                <div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                        <span>Dashboards</span>
                        <span>/</span>
                        <span>Custom</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900">{activeDashboard}</h1>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Private</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => setIsCreateDashboardOpen(true)}>
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        New Dashboard
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleScheduleEmail}>
                        <Mail className="mr-2 h-4 w-4" />
                        Schedule Email
                    </Button>
                    <Button size="sm" onClick={() => setIsAddMetricOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Widget
                    </Button>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="p-8">
                {/* Date Filter / Controls Bar */}
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center bg-white rounded-md border border-slate-200 p-1 shadow-sm">
                        <Button variant="ghost" size="sm" className="h-8 text-slate-600 bg-slate-100 font-medium">Daily</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-slate-900">Weekly</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-slate-900">Monthly</Button>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="h-4 w-4" />
                        <span>Last updated: Today at 9:41 AM</span>
                   </div>
                </div>

                {dashboardMetrics.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                            <LayoutGrid className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">This dashboard is empty</h3>
                        <p className="text-slate-500 mb-6 max-w-sm text-center">Start tracking your mobile marketing success by adding your first metric.</p>
                        <Button onClick={() => setIsAddMetricOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Widget
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {dashboardMetrics.map((metric) => (
                            <div key={metric.id} className="h-[300px]">
                                <MetricCard 
                                    metric={metric} 
                                    onRemove={() => handleRemoveMetric(metric.id)} 
                                />
                            </div>
                        ))}
                        
                        {/* Add New Placeholder Card */}
                        <button 
                            onClick={() => setIsAddMetricOpen(true)}
                            className="h-[300px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group"
                        >
                            <div className="h-12 w-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
                                <Plus className="h-6 w-6" />
                            </div>
                            <span className="font-medium">Add Widget</span>
                        </button>
                    </div>
                )}
            </main>

            {/* Modals */}
            <AddMetricModal 
                open={isAddMetricOpen} 
                onOpenChange={setIsAddMetricOpen}
                onAdd={handleAddMetrics}
                currentMetrics={dashboardMetrics.map(m => m.id)}
            />

            <CreateDashboardModal 
                open={isCreateDashboardOpen} 
                onOpenChange={setIsCreateDashboardOpen}
                onCreate={handleCreateDashboard}
            />
        </div>
    );
};
