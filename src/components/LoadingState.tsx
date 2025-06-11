import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BrainCircuit, Sparkles } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <BrainCircuit className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Analyzing Your Resume
            </h3>
            <p className="text-slate-600">
              Our AI is carefully reviewing your experience and generating personalized insights...
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Identifying suitable job roles</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-75"></div>
              <span>Analyzing skill requirements</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-150"></div>
              <span>Generating improvement suggestions</span>
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
        </div>
      </Card>
    </div>
  );
}