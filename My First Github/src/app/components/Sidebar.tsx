import React from 'react';
import { Home, BarChart2, Users, Settings, PlusCircle, PieChart, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col p-4 border-r border-slate-800">
      <div className="mb-8 px-2 flex items-center gap-2">
        <div className="h-8 w-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
            CT
        </div>
        <span className="text-white font-bold text-lg">CleverTap</span>
      </div>

      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant="secondary" className="w-full justify-start bg-slate-800 text-white hover:bg-slate-700">
          <PieChart className="mr-2 h-4 w-4" />
          Custom Dashboards
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
          <BarChart2 className="mr-2 h-4 w-4" />
          Analytics
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
          <Users className="mr-2 h-4 w-4" />
          Segments
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
          <Mail className="mr-2 h-4 w-4" />
          Campaigns
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
            My Dashboards
        </h3>
        <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800 text-xs">
                Mobile Growth 
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800 text-xs">
                Retention Overview
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800 text-xs">
                Executive Summary
            </Button>
             <Button variant="ghost" size="sm" className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-slate-800 text-xs mt-2">
                <PlusCircle className="mr-2 h-3 w-3" />
                Create New
            </Button>
        </div>
      </div>

      <div className="mt-auto">
        <Separator className="bg-slate-800 mb-4" />
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};
