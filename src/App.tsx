import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ResumeInput } from '@/components/ResumeInput';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import type { AnalysisResult } from '@/types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'input' | 'results'>('input');

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentStep('results');
    setIsLoading(false);
  };

  const handleStartOver = () => {
    setAnalysisResult(null);
    setCurrentStep('input');
    setIsLoading(false);
  };

  const handleStartAnalysis = () => {
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header onStartOver={handleStartOver} showStartOver={currentStep === 'results'} />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'input' && (
          <>
            <Hero />
            <ResumeInput 
              onAnalysisStart={handleStartAnalysis}
              onAnalysisComplete={handleAnalysisComplete}
              isLoading={isLoading}
            />
          </>
        )}
        
        {currentStep === 'results' && analysisResult && (
          <ResultsDisplay 
            result={analysisResult}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;