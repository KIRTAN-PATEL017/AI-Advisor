import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUpload } from '@/components/FileUpload';
import { TextInput } from '@/components/TextInput';
import { LoadingState } from '@/components/LoadingState';
import { toast } from 'sonner';
import type { AnalysisResult} from '@/types';

interface ResumeInputProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
  isLoading: boolean;
}

export function ResumeInput({ onAnalysisStart, onAnalysisComplete, isLoading }: ResumeInputProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  const handleAnalyze = async (result: AnalysisResult) => {
    onAnalysisStart();
    
    try {
      onAnalysisComplete(result);
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze resume. Please try again.');
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Share Your Resume
          </h3>
          <p className="text-slate-600">
            Upload a file or paste your resume text to get started with AI analysis
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'upload' | 'paste')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" className="gap-2">
              Upload File
            </TabsTrigger>
            <TabsTrigger value="paste" className="gap-2">
              Paste Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <FileUpload onAnalyze={handleAnalyze} onAnalyzeStart={onAnalysisStart} />
          </TabsContent>

          <TabsContent value="paste" className="space-y-4">
            <TextInput onAnalyze={handleAnalyze} onAnalyzeStart={onAnalysisStart}/>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}