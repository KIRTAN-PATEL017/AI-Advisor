import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Target, TrendingUp, Sparkles, Download, Share } from 'lucide-react';
import type { AnalysisResult } from '@/types';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onStartOver: () => void;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">
          Your Career Analysis Results
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Based on your resume, here are personalized insights to accelerate your career growth.
        </p>
      </div>

      {/* Summary Card */}
      {result.summary && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Executive Summary</h3>
          <p className="text-slate-700 leading-relaxed">{result.summary}</p>
        </Card>
      )}

      {/* Main Results Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Job Roles */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Recommended Job Roles</h3>
              <p className="text-sm text-slate-600">Positions that match your profile</p>
            </div>
          </div>

          <div className="space-y-3">
            {result.roles.map((role, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <h4 className="font-medium text-slate-900">{role}</h4>
              </div>
            ))}
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Skills to Develop</h3>
              <p className="text-sm text-slate-600">Enhance your marketability</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Resume Improvements */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Resume Enhancement Suggestions</h3>
            <p className="text-sm text-slate-600">Professional improvements for your resume</p>
          </div>
        </div>

        <div className="space-y-6">
          {result.improvements.map((improvement, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Original:</h4>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-slate-800">{improvement.original}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Improved:</h4>
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-slate-800">{improvement.suggestion}</p>
                  </div>
                </div>
              </div>
              
              {index < result.improvements.length - 1 && (
                <Separator className="my-6" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="gap-2">
          <Share className="h-4 w-4" />
          Share Results
        </Button>
      </div>
    </div>
  );
}