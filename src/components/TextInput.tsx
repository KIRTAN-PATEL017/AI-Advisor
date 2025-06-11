import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PenTool } from 'lucide-react';
import type { AnalysisResult } from '@/types';
import axios from 'axios';

interface TextInputProps {
  onAnalyze: (data: AnalysisResult) => Promise<void>;
}

export function TextInput({ onAnalyze }: TextInputProps) {
  const [resumeText, setResumeText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;

    setIsProcessing(true);
    try {
      const data = await axios.post('http://localhost:5000/text', {text : resumeText});
      onAnalyze(data);
    } finally {
      setIsProcessing(false);
    }
  };

  const wordCount = resumeText.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <PenTool className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-900">Paste Your Resume</h4>
            <p className="text-slate-600">Copy and paste your resume content below</p>
          </div>
        </div>

        <Textarea
          placeholder="Paste your resume here... Include your work experience, education, skills, and any other relevant information."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="min-h-[300px] resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
        />

        <div className="flex justify-between items-center text-sm text-slate-500">
          <span>{wordCount} words</span>
          <span>Minimum 50 words recommended</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleAnalyze}
          disabled={!resumeText.trim() || wordCount < 10 || isProcessing}
          className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-8"
        >
          {isProcessing ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      </div>
    </div>
  );
}