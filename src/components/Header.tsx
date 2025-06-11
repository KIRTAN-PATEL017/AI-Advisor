import { Button } from '@/components/ui/button';
import { BrainCircuit, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onStartOver: () => void;
  showStartOver: boolean;
}

export function Header({ onStartOver, showStartOver }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">AI Career Advisor</h1>
            <p className="text-sm text-slate-600">Your intelligent career companion</p>
          </div>
        </div>
        
        {showStartOver && (
          <Button 
            onClick={onStartOver}
            variant="outline"
            className="gap-2 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Analyze New Resume
          </Button>
        )}
      </div>
    </header>
  );
}