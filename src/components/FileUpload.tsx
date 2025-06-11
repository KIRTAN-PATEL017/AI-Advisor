import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from 'sonner';
import type { AnalysisResult } from '@/types';
import axios from 'axios';

interface FileUploadProps {
  onAnalyze: (data: AnalysisResult) => Promise<void>;
  onAnalyzeStart: () => void;
}

export function FileUpload({ onAnalyze , onAnalyzeStart}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/plain' || file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        toast.error('Please upload a PDF or text file');
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      if (file.type === 'text/plain' || file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        toast.error('Please upload a PDF or text file');
      }
    }
  };

  const handleAnalyze = async () => {
  if (!selectedFile) return;

  onAnalyzeStart();

  setIsProcessing(true);
  try {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await axios.post('http://localhost:5000/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await onAnalyze(res.data); // this already shows success toast

  } catch (error) {
    toast.error('Failed to process file');
  } finally {
    setIsProcessing(false);
  }
};


  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Upload className="h-8 w-8 text-white" />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
              Drop your resume here
            </h4>
            <p className="text-slate-600 mb-4">
              or click to browse files
            </p>
            <p className="text-sm text-slate-500">
              Supports PDF and TXT files up to 10MB
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-slate-900">{selectedFile.name}</p>
              <p className="text-sm text-slate-600">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleAnalyze}
              disabled={isProcessing}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isProcessing ? 'Processing...' : 'Analyze Resume'}
            </Button>
            <Button
              onClick={removeFile}
              variant="ghost"
              size="sm"
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}