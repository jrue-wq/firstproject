import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { mockMetrics } from '../data/mockData';

interface AddMetricModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: (metricIds: string[]) => void;
    currentMetrics: string[];
}

export const AddMetricModal: React.FC<AddMetricModalProps> = ({ open, onOpenChange, onAdd, currentMetrics }) => {
    const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>([]);

    // Reset selection when modal opens
    React.useEffect(() => {
        if (open) {
            setSelectedMetrics([]);
        }
    }, [open]);

    const handleToggle = (id: string) => {
        if (selectedMetrics.includes(id)) {
            setSelectedMetrics(selectedMetrics.filter(m => m !== id));
        } else {
            setSelectedMetrics([...selectedMetrics, id]);
        }
    };

    const handleSave = () => {
        onAdd(selectedMetrics);
        onOpenChange(false);
    };

    const availableMetrics = mockMetrics.filter(m => !currentMetrics.includes(m.id));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Metrics</DialogTitle>
                    <DialogDescription>
                        Select metrics to add to your dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-[300px] overflow-y-auto space-y-4">
                    {availableMetrics.length === 0 ? (
                        <div className="text-center text-slate-500 py-8">
                            All available metrics are already on your dashboard.
                        </div>
                    ) : (
                        availableMetrics.map(metric => (
                            <div key={metric.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                                <Checkbox 
                                    id={metric.id} 
                                    checked={selectedMetrics.includes(metric.id)}
                                    onCheckedChange={() => handleToggle(metric.id)}
                                    className="mt-1"
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor={metric.id} className="font-medium cursor-pointer">
                                        {metric.name}
                                    </Label>
                                    <p className="text-sm text-slate-500">
                                        {metric.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={selectedMetrics.length === 0}>
                        Add Selected
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
