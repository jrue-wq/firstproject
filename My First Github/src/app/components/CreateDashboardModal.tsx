import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface CreateDashboardModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (data: any) => void;
}

export const CreateDashboardModal: React.FC<CreateDashboardModalProps> = ({ open, onOpenChange, onCreate }) => {
    const [name, setName] = React.useState('');
    const [visibility, setVisibility] = React.useState('private');
    const [frequency, setFrequency] = React.useState('daily');

    const handleCreate = () => {
        onCreate({ name, visibility, frequency });
        onOpenChange(false);
        setName('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Custom Dashboard</DialogTitle>
                    <DialogDescription>
                        Set up a new view for your most important mobile marketing metrics.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Executive Summary"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="visibility" className="text-right">
                            Visibility
                        </Label>
                        <RadioGroup 
                            value={visibility} 
                            onValueChange={setVisibility}
                            className="col-span-3 flex flex-col space-y-1"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" id="private" />
                                <Label htmlFor="private" className="font-normal">Private (Only me)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="public" id="public" />
                                <Label htmlFor="public" className="font-normal">Public (Entire Organization)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="frequency" className="text-right">
                            Email Pulse
                        </Label>
                        <Select value={frequency} onValueChange={setFrequency}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={!name}>Create Dashboard</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
