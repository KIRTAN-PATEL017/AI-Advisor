export interface AnalysisResult {
  roles: string[];
  skills: string[];
  improvements: {
    original: string;
    suggestion: string;
  }[];
  summary?: string;
}

export interface ResumeData {
  content: string;
  filename?: string;
  type: 'upload' | 'paste';
}